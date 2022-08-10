import { ethers } from "ethers";
import { useState } from "react";

import Ticketing from "../artifacts/contracts/Ticketing.sol/Ticketing.json";
import EventDetails from "../components/EventDetails";
const ticketingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function ViewEvents() {

    const [eventName, setEventName] = useState('')
    const [eventDetails, setEventDetails] = useState({})
    let tempObj;
    
    const connectWallet = async() =>{
        const {ethereum} = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }
                                
    const submitEvent = async(e) => {
        e.preventDefault();
        if(!eventName) return;
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(ticketingAddress, Ticketing.abi, provider);

            try{
                const data = await contract.get_event_info(eventName);
                tempObj = {eventName: data[0], availableTickets: rPN(data[1]._hex), deadline: rPN(data[2]._hex),  maxPerCust: data[3]._hex, ticketPrice: data[4]._hex, saleActive: data[5], perCustLimit: data[6]};
                console.log("data:____-----___", tempObj);
                setEventDetails(tempObj);
            }
            catch(err){
                console.log("Error:----___", err)
            }

        }
    }
    
    return (
        <>
            <form className="p-5">
                <div className="mb-3">
                    <label forhtml="EventName" className="form-label">Input Event Name: </label>
                    <input type="text" className="form-control"  onChange={(e) => setEventName(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100" onClick={(e) => submitEvent(e)}>View Event</button>
            </form>

            {Object.keys(eventDetails).length ? <EventDetails eventObject={eventDetails}/> : ''} 
        </>
    )
}

const rPN = (hex) => {
    return ethers.utils.arrayify(hex)[0];
}