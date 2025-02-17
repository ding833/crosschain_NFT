require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@chainlink/env-enc").config()
require("./task")

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const AMOY_RPC_URL = process.env.AMOY_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    //当使用firstAccount时，第一个账户会被调用
    firstAccount: {
      default: 0,
    }
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
      companionNetworks: {
        destChain: "amoy"
      }
    },
    amoy: {
      url: AMOY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
      blockConfirmations: 6,
      companionNetworks: {
        destChain: "sepolia"
      }
    }
  }
};
