

// const {network} = require("hardhat")
// const{developmentChains, DECIMAL, INITIAL_ANSWER} = require("../helper-hardhat-config")


// module.exports = async({getNamedAccounts, deployments }) => {
//     //pulling functions from deployments
//     const{deploy , log} = deployments
//     const{deployer} = await getNamedAccounts()
//     // const chainId = network.config.chainId
//     // AggregatorV3Interface
//     if(developmentChains.includes(network.name)) {
//         //log = console.log 
//         log("local network detected! deploying mocks")
//         await deploy("MockV3Aggregator", {
//             contract: "Mockv3Aggregator",
//             from: deployer,
//             log: true,
//             //to get args we should check github or node modulus and serach which arguments are passed in the consturtor
//             args:[DECIMAL, INITIAL_ANSWER],

//         })
//         log("mocks deployed.......................................................!")
//     }
//     //if we wanna onlhy run specific file, or only mock

    



// }
// module.exports.tags = ["all","mocks"]


const { network } = require("hardhat")

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            //log is used to give the complete log like gas and address and stuffs
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks Deployed!")
        log("------------------------------------------------")
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
        log(
            "Please run `npx hardhat console` to interact with the deployed smart contracts!"
        )
        log("------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
