require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  path: {
    artifacts: './contracts/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
