const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("verifying contract........")
    try{
        await run("verify:verify" , {
            address: contractAddress,
            constructorArguments:args,
        })
    }
    catch (e) {
        if(e.message.toLower().includes("alreday verified")){
            console.log("alreday verified........")
        }
        else{
            console.log(e)
        }
    }
}

module.exports = {verify}