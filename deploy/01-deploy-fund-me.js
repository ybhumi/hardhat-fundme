



// // function deployFunc() {
// //     console.log("hai")

// // }
// // module.exports.default = deployFunc


// //both of these syntaxs mean the same


// // module.exports = async (hre) => {
// //    const{ getNameAccounts, deployments } =hre 
// //    //importing things from hre (hardhat runtime environment)
// // }

// const{networkconfig} = require("../helper-hardhat-config")
// const {network} = require("hardhat")

// module.exports = async({getNamedAccounts, deployments }) => {
//     //pulling functions from deployments
// const{deploy , log} = deployments
// const{deployer} = await getNamedAccounts()
// const chainId = network.config.chainId
// //if chainid is x ,use address y
// const ethUsdPriceFeed = networkconfig[chainId]["ethUsdPriceFeed"]
// //the idea of mock contract is that if the contract snt exists, we deploy a minimal version of it for our local testing


// //when goin for localhost or hardhat network we want to use a mock
// const fundMe = await deploy("FundMe" ,{
//     from:deployer,
//     args:[
//         /*address? */],

// } )





// }


const { networkConfig } = require("../helper-hardhat-config")
//const { verify } = require("../utils/verify")
const { network } = require("hardhat")
require("dotenv").config()


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    
    
    
    const fundMe = await deploy("FundMe", {
        contarct:"MockV3Aggregator",
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, [ethUsdPriceFeedAddress])
    // }
}

module.exports.tags = ["all", "fundme"]
