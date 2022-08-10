# An Overview of the project

One of the major problems young blockchain developers face is they lack a platform that showcases decentralized applications or they dont know how to reach out to communities to try out their projects and the solution to this problem has been created by Team Nodes, which is the introduction of our platform named "D-Nodes"

## Tools

- Solidity
- Hardhat
- Nextjs
- Reactjs
- IPFS

# D-Nodes Decentralized Application

The D-Nodes Dapp is a platform hosted on IPFS which also hosts multiple dapps that gives users the oppurtunity to surf through multiple dapps created by random developers, basically, it serves as a community for decentralized applications. In the future, other dapps can be hosted but at this moment the D-Node dapp is hosting three dapps which are as follows:

- An Event Ticketing system
- A Decentralized Storage System
- A Land Ownership Register(Landgister)
-

## Event Ticketing system

### Why we need An Event Ticketing System

One of the main problem event hosts and their customers face are the middlemen, they can decide to create artificial scarcity, increase the price, misinform the customer, all these problems affect both the event hosters and the customers, Hence the Event Ticketing System is introduced.

The event tickecting dapp helps entities create events or customers buy ticket for an event. In this dapp there are two entities i.e event Host and the customer. with this system the middle man is eliminated which reduces the problem faced.A customer is being issued an NFT after purchasing tickets and that serves as the ticket which everything stored on IPFS.

### What the Event Host can Do

- Create a new event. The sender becomes the owner of the new event.
- Withdraw all funds received for tickets to the event identified
- View all funds received for tickets to the event identified
- Get the number of tickets this customer owns for a given event
- Change the ticket price to the new value
- Increase the number of available tickets by the given amount

### What a Customer can Do

Buy tickets

- Ticket sale must be open
- The number of tickets requested must be available
- A customer can buy any amount of tickets up to the maximum per customer allowed by owner (if the owner has set a limit)
- The customer must transfer at least the amount equal to number of tickets requested multiplied by the ticket price
- The customer is stored if accepted (address and number of tickets)
- Excess amount is returned to sender

Return tickets

- Rejects if buyback or sale is disabled
- Rejects if deadline is passed
- Returns the total amount the sender has previously paid to the contract-
- Deletes all tickets owned by sender and adds them to available tickets

Generate Tickets Id

- based on data enterd a hash is generated to identify a ticket.

A customer can get their Id and available tickets

for more info plase read the Read Me file in the Ticketing Folder

## Decentralized Storage System

### Why a Decentralized Storage System

Centralized storage systems hold your data in large servers and that is a single point of failure, if something goes wrong with their server your files are then compromised, either your data is lost forever or it gets into the wrong hands which could be dangerous to an entity. Hence the Decentralized Storage System hosted on IPFS.

The project consists in a decentralized storage system, being kind of a Dropbox but in a more decentralized manner. It allows the user to upload a file to a decentralized system called IPFS (Inter Planetary File System), sharing it with anyone who knows the hash identifier.

- Select a file
  The user can select a file from his local machine and type a description on the description input section.
- Upload a file
  Once the user has selected the file he wants to upload, then he must click on the UPLOAD FILE button. At this point, Metamask will ask for a confirmation, and once confirmed, the user will pay an small fee to record the following on the blockchain: Name, Description, Type, Size, Date, Uploader and Hash.The file is then uploaded to the IPFS.
- Only you can access you files(using your address).
- You can delete, edit, view and see dating in regard to your file.

## Land Ownership Register

### Why a Land Ownership Register

Land registration authorities are frequently held accountable for the alleged mismanagement and manipulation of land records in various countries.Different parties therefore claim varying degrees of authority over a specific piece of land. In principle, land registries simply need to maintain records of land and real estate ownership, recording changes of hands as they happen over the years. It sounds like a simple enough task, but it comes with myriad challenges. No transperancy and this sometimes leads to violence.

Blockchain provides a potential solution for many of the challenges of land registration. This use case for blockchain extends beyond a pure database, leveraging the opportunity to create a permanent, unbreakable record of ownership for land or real estate.

The simplest implementation of a blockchain-based land registry would enable the ownership documents to be recorded and assigned to the owner’s user account. If there are structural changes to the building, these can be added to the blockchain, and if the property is sold, all the relevant documentation can be transferred to the new owner. Every transaction is traceable, timestamped, and indisputable because an NFT is issues after every land Registration.
a mixture of OnChain/Off-Chain solution.

# Contract Interface

- register()
  A function which registers the details and mints an ERC-721 token open succesful registration.

-viewAssets()
A function that returns the assets owned by a user.

-makeAvailable()
A function which makes a registered land available for purchase.

-purchaseland()
A function which lets a interested party securely purchase the land.

-withdraw()
A function that lets seller withdraw their funds.

-removeOwnership()
A function that removes and changes ownership

-owner()
A function that returns the owner of a land.

### Team Members

-Abdulsamad Otaiki Sadiq(Frontend developer and Blockchain developer)
-Roberts Faith (Frontend Developer)
-Godwin Boniface (Blockchain Developer)
-Salihu Abdulaziz (Blockchain Developer)
-Haruna Josiah (Blockchain Developer)
