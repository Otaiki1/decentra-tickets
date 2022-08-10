// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const TokenContract = await hre.ethers.getContractFactory("Token");
  const token = await TokenContract.deploy();

  await token.deployed();
  console.log("Token Address deployed to:", token.address);

  const TicketingContract = await hre.ethers.getContractFactory("Ticketing");
  const ticketing = await TicketingContract.deploy(token.address);

  await ticketing.deployed();

  console.log("Ticketing Address deployed to:", ticketing.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});