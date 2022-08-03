import { ethers } from "ethers";
import { useState } from "react";

import Ticketing from "../contracts/artifact/Ticketing.json";
const ticketingAddress = "0x27716502128cfCAFC3b4959B9146fEB23B827ee0";

export default function CreateEvent() {

    const[eventName, setEventName] = useState('')
    const[ticketNumber, setTicketNumber] = useState(Number)
    const[ticketPrice, setTicketPrice] = useState(Number)
    const[maxCustomer, setMaxCustomer] = useState(Number)
    const[deadline, setDeadline] = useState(Number)
    


    const connectWallet = async() =>{
        const {ethereum} = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const registerEvent = async() => {
        
    }

    const submitEvent = async(e) => {
        e.preventDefault();
        if(!eventName && !ticketNumber && !ticketPrice && !maxCustomer && !deadline) return;
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer =  await provider.getSigner();
            const contract = new ethers.Contract(ticketingAddress, Ticketing.abi, signer);
            console.log(contract);
            const transaction = await contract.createEvent(eventName, [ticketNumber], [ticketPrice], true, maxCustomer, deadline);
            console.log(transaction)
        }
    }

    return (
        <form className="p-5">
            <div className="mb-3">
                <label forHtml="EventName" className="form-label">Event Name: </label>
                <input type="text" className="form-control"  onChange={(e) => setEventName(e.target.value)}required/>
            </div>
            <div className="mb-3">
                <label forHtml="Number of tickets" className="form-label">Number of Tickets</label>
                <input type="number" className="form-control" onChange={(e) => setTicketNumber(e.target.value)}required/>
            </div>
            <div className="mb-3">
                <label forHtml="Tickets Price" className="form-label">Tickets price</label>
                <input type="number" className="form-control" onChange={(e) => setTicketPrice(e.target.value)}required/>
            </div>
            <div className="mb-3">
                <label forHtml="Maximium per customer" className="form-label">Maximum per customer</label>
                <input type="number" className="form-control" onChange={(e) => setMaxCustomer(e.target.value)}required/>
            </div>
            <div className="mb-3">
                <label forHtml="deadline" className="form-label">Deadline</label>
                <input type="num" className="form-control" onChange={(e) => setDeadline(e.target.value)}required/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100" onClick={(e) => submitEvent(e)}>Submit</button>
</form>
    )
}