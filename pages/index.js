// import Head from 'next/head'\
import AccordionItem from '../components/AccordionItem'
import styles from '../styles/Home.module.css'

import { ethers } from "ethers";
import { useState, useEffect } from "react";

import Ticketing from "../artifacts/contracts/Ticketing.sol/Ticketing.json";
const ticketingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function Home() {
  
  const[allEvents, setAllEvents] = useState([])

  const connectWallet = async() =>{
    const {ethereum} = window;
    let check = await ethereum.request({method: 'eth_requestAccounts'});
    await check;
}

  const fetchEvents = async() => {
    if (typeof window.ethereum !== 'undefined') {
        await connectWallet();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(ticketingAddress, Ticketing.abi, provider);
        try{
          const data = await contract.get_events();
          setAllEvents(data)
        }catch(err){
          console.log("Error:_____---", err)
        }
    }
  }

  useEffect(() => {
    fetchEvents()
  })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Decentra-Tickets</a>
        </h1>

        <p className={styles.description}>
          A decentralized smart ticketing system
        </p>
        <div className="accordion" id="accordionExample">
          {allEvents.map((e,i) => <AccordionItem event={e} key={i} eventNum={i} />)}
        </div>
        
      </main>

    </div>
  )
}
