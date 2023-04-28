// require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require('hardhat-deploy')
/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.private_key || "0xe8bd900ce779000e386f61e2a57c7728d537b39ce6346e2edde54deb15468325";
const coninmarketapikey = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const SEPOLIA_RPC_URL = process.env.sepolia_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/VcNcia-9elkrAOm_Qfg9nPUY03d_rHOV";

module.exports = {
  // solidity: "0.8.8", //we will get problem if we are working with same version when we deal with dffnt files so we can add multiple versions
  solidity:{
    compilers:[
      {version: "0.8.8"},
      {version:'0.6.6'},
    ],
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
},
  
  defaultNetwork:"hardhat",
  networks: {
   hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
  },
  sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
  },
  },
};

// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5144