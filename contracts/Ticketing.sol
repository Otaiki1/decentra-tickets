// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IToken.sol";

contract Ticketing {
    Itoken iToken;

    address deployer;
    constructor(address _account){
        iToken = Itoken(_account);
        deployer = msg.sender;
    }
    //A Smart contract that creates, stores and sell tickets to buyers with transparency for both the buyer and the seller.

    struct eventsData {
        address payable owner;
        string event_Id; // string name of the event
        uint256 ticket_prices; // face value price of tickets (in wei)
        uint256 totalTickets; // total tickets
        uint256 available_tickets; // total number of ticket
        uint256 deadline; //time deadline of events
        uint256 funds; //funds the event generated
        uint256 index;
        bool sale_active; //if the sale of event tickets is active
        bool exists; // if the event exists
        bool per_customer_limit; // per customer limit
        uint64 max_per_customer; //maximum event per customer
        mapping(address => Customer) tickets; //a mapping the stores the key value of customer in the event
        address[] customers; //address array of the customers.
    }

    struct Customer {
        uint256 index;
        address addr;
        bool exists;
        uint64 total_num_tickets;
        uint128 total_paid;
        uint num_tickets;
        bytes32 ticketId;
    }
    eventsData[] public genEvents;
    mapping(string => eventsData) public events;
    string[] public event_id_list;
    uint8 public max_ticket_amount = 100;

    //A struct that stores a mapping of events Name to ticket Id as well as array of all events Name somebody has
    struct tickets{
        string[] eventName;
        mapping(string => bytes32)eventList;
    }
    // a mapping that links each address to the event 
    mapping(address => tickets) participation;
    //Events for the state changing functions.

    event event_created(
        address indexed creator,
        string eventName
        
    );
    event ticket_bought(
        address indexed buyer,
        string eventName
        
        
    );
    event fund_withdrawn(
        address indexed creator,
        string eventName,
        uint timestamp
    );
    event ticketPriceChange(
        address indexed creator,
        string EventName,
        uint timestamp
    );
    event event_deleted(address indexed creator, string eventName);

    modifier eventExists(string memory event_id) {
        require(events[event_id].exists, "Event with given ID not found.");
        _;
    }

    modifier onlyHost(string memory event_id) {
        require(
            events[event_id].owner == msg.sender,
            "Sender is not the owner of this event"
        );
        _;
    }

    modifier beforeDeadline(string memory event_id) {
        require(
            events[event_id].deadline > block.timestamp,
            "Event deadline has passed"
        );
        _;
    }

    modifier afterDeadline(string memory event_id) {
        require(
            events[event_id].deadline < block.timestamp,
            "Event deadline has not yet passed"
        );
        _;
    }

    function changeMaxTicketAmount(uint8 num) public {
        require(msg.sender == deployer);
        max_ticket_amount = num;
    }

    // ----------Event Host functions.-------------

    // creates and stores events for event hosts.
    function createEvent(
        string calldata _event_id,
        uint num_tickets,
        uint _ticket_prices,
        bool _per_customer_limit,
        uint64 _max_per_customer,
        uint256 _deadline
    ) external {
        require(!events[_event_id].exists, "Given event ID is already in use.");
        // require(
        //     num_tickets.length == _ticket_prices.length,
        //     "Different number of ticket types given by price and number available arrays."
        // );
        require(
            num_tickets > 0,
            "Cannot create event with zero ticket types."
        );
        require(
            num_tickets <= max_ticket_amount,
            "Maximum ticket Amount exceeded."
        );
        require(_deadline > block.timestamp, "Deadline cannot be in the past");
        events[_event_id].exists = true;
        events[_event_id].event_Id = _event_id;
        events[_event_id].available_tickets = num_tickets;
        events[_event_id].ticket_prices = _ticket_prices;
        events[_event_id].max_per_customer = _max_per_customer;
        events[_event_id].per_customer_limit = _per_customer_limit;
        events[_event_id].owner = payable(msg.sender);
        events[_event_id].deadline = _deadline;
        events[_event_id].index = event_id_list.length;
        event_id_list.push(_event_id);

        emit event_created(msg.sender, _event_id);
    }

    // Deletes events after deadline
    function delete_event(string memory event_id)
        external
        eventExists(event_id)
        onlyHost(event_id)
    {
        uint256 old_index = events[event_id].index;
        delete events[event_id];
        events[event_id_list[event_id_list.length - 1]].index = old_index;
        event_id_list[old_index] = event_id_list[event_id_list.length - 1];
        delete event_id_list[event_id_list.length - 1];
        event_id_list.length - 1;
    }

    // changes event ticket price
    function change_ticket_price(
        string memory event_id,
        uint64 ticket_type,
        uint128 new_price
    ) external eventExists(event_id) onlyHost(event_id) {
        require(
            ticket_type < events[event_id].ticket_prices,
            "Ticket type does not exist."
        );
        events[event_id].ticket_prices = new_price;
    }

    //add tickets
    function add_tickets(
        string memory event_id,
        uint additional_tickets
    ) external eventExists(event_id) onlyHost(event_id) {
        
            events[event_id].available_tickets += additional_tickets;
    }

    //get total number of ticket buyers
    function get_customers(string calldata event_id)
        external
        view
        returns (address[] memory)
    {
        return (events[event_id].customers);
    }

    // get customers
    function get_tickets(string memory event_id, address customer)
        external
        view
        eventExists(event_id)
        returns (uint)
    {
        return events[event_id].tickets[customer].num_tickets;
    }

    // view funds of bought tickets
    function view_funds(string calldata event_id)
        external
        view
        eventExists(event_id)
        onlyHost(event_id)
        returns (uint256 current_funds)
    {
        return events[event_id].funds;
    }

    // withdraws funds after deadline exceedes
    function withdraw_funds(string memory event_id)
        external
        eventExists(event_id)
        onlyHost(event_id)
        afterDeadline(event_id)
    {
        uint256 withdraw_amount = events[event_id].funds;
        events[event_id].funds = 0;

        (bool success, ) = events[event_id].owner.call{
            value: (withdraw_amount)
        }("");
        require(success, "Withdrawal transfer failed.");
    }

    //---------customer functions-------------

    //buys ticket
    function buy_tickets(
        string memory event_id,
        uint64 requested_num_tickets
    ) external payable {
        require(requested_num_tickets > 0);
        
        require( requested_num_tickets <=   events[event_id].available_tickets,"Not enough tickets available.");
        require(
            !events[event_id].per_customer_limit ||
                (events[event_id].tickets[msg.sender].total_num_tickets +
                    requested_num_tickets <=
                    events[event_id].max_per_customer),
            "Purchase surpasses max per customer."
        );

        uint128 sum_price = uint128(requested_num_tickets) * uint128(events[event_id].ticket_prices);
        require(msg.value >= sum_price, "Not enough ether was sent.");

        if (!events[event_id].tickets[msg.sender].exists) {
            events[event_id].tickets[msg.sender].exists = true;
            events[event_id].tickets[msg.sender].addr = msg.sender;
            events[event_id].tickets[msg.sender].index = events[event_id]
                .customers
                .length;
            events[event_id].customers.push(msg.sender);
            events[event_id].tickets[msg.sender].num_tickets = requested_num_tickets;
        }

        events[event_id]
            .tickets[msg.sender]
            .total_num_tickets += requested_num_tickets;
        events[event_id].tickets[msg.sender].num_tickets += requested_num_tickets;
        events[event_id].tickets[msg.sender].total_paid += sum_price;
        events[event_id].available_tickets -= requested_num_tickets;
        events[event_id].tickets[msg.sender].total_paid += sum_price;
        events[event_id].funds += sum_price;
        bytes32 id = _generateTicketId(
            event_id,
            requested_num_tickets,
            msg.sender
        );
        events[event_id].tickets[msg.sender].ticketId = id;
        // iToken.safeMint(msg.sender, event_id) ;

        //update the participation mapping
        participation[msg.sender].eventName.push(event_id);
        participation[msg.sender].eventList[event_id] = id;

        // Return excessive funds
        if (msg.value > sum_price) {
            (bool success, ) = msg.sender.call{value: (msg.value - sum_price)}(
                ""
            );
            require(success, "Return of excess funds to sender failed.");
        }
        emit ticket_bought(msg.sender, event_id);
    }

    // returns ticket
    function return_tickets(string memory event_id)
        external
        beforeDeadline(event_id)
    {
        require(
            events[event_id].tickets[msg.sender].total_num_tickets > 0,
            "User does not own any tickets to this event."
        );
        require(
            events[event_id].sale_active,
            "Ticket sale is locked, which disables buyback."
        );
        uint return_amount = events[event_id].tickets[msg.sender].total_paid;
        // for (uint64 i = 0; i < events[event_id].available_tickets.length; i++) {
        //     // Check for integer overflow
        //     require(
        //         events[event_id].available_tickets[i] +
        //             events[event_id].tickets[msg.sender].num_tickets[i] >=
        //             events[event_id].available_tickets[i],
        //         "Failed because returned tickets would increase ticket pool past storage limit."
        //     );
            // events[event_id].available_tickets[i] += events[event_id]
                // .tickets[msg.sender]
                // .num_tickets[i];
        // }
        events[event_id].available_tickets += events[event_id]
                .tickets[msg.sender]
                .num_tickets;
        events[event_id].funds -= return_amount; 
        uint index = findIndex(event_id, msg.sender);
          participation[msg.sender].eventName[index] = '';
        participation[msg.sender].eventList[event_id] = 0;
        (bool success, ) = msg.sender.call{value: (return_amount)}("");
        require(success, "Return transfer to customer failed.");
    }

    // gets the generated ticket id
    function getGenTickedId(string calldata event_id)
        external
        view
        returns (bytes32)
    {
        return (events[event_id].tickets[msg.sender].ticketId);
    }

    // available ticketss
    function availableTickets(string memory event_id)
        external
        view
        returns (uint)
    {
        return events[event_id].available_tickets;
    }

    // internal function
    function _generateTicketId(
        string memory _name,
        uint64 _num1,
        address signer
    ) internal pure returns (bytes32) {
        bytes32 gen = bytes32(
            keccak256(abi.encodePacked(_name, _num1,signer))
        );
        return gen;
    }

    // ----- View functions -----

  function get_event_info(string memory eventId) external view eventExists(eventId) returns (
    string memory,
    uint256 deadline,
    uint256 available_tickets,
    uint64 max_per_customer,
    uint256 ticket_price,
    bool sale_active,
    bool per_customer_limit) {

    return (
      events[eventId].event_Id,
      events[eventId].deadline,
      events[eventId].available_tickets,
      events[eventId].max_per_customer,
      events[eventId].ticket_prices,
      events[eventId].sale_active,
      events[eventId].per_customer_limit);
  }

  function get_events() external view returns (string[] memory event_list) {
    return event_id_list;
  }

  function getUserEvents() external view returns (string[] memory) {
            return participation[msg.sender].eventName;
  }

//A function that finds the index of a particular unique number
    function findIndex(string memory _id, address _addr) public view returns(uint){
        uint i;
        for(i=0;i<participation[_addr].eventName.length;i++){
            string memory theEventName = participation[_addr].eventName[i];
            if(keccak256(abi.encodePacked(theEventName)) == keccak256(abi.encodePacked(_id))){
                return i;
            }
        } 
        return i;
    }

}