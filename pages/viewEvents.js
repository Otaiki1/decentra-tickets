import { ethers } from "ethers";
import { useState } from "react";

import Ticketing from "../contracts/artifact/Ticketing.json";
const ticketingAddress = "0x27716502128cfCAFC3b4959B9146fEB23B827ee0";

export default function CreateEvent() {

    const[eventName, setEventName] = useState('')
    


    const connectWallet = async() =>{
        const {ethereum} = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
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
                <label forHtml="EventName" className="form-label">Input Event Name: </label>
                <input type="text" className="form-control"  onChange={(e) => setEventName(e.target.value)}required/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100" onClick={(e) => submitEvent(e)}>Buy Tickets</button>
</form>
    )
}