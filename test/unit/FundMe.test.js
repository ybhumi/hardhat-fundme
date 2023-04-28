const { assert , expect} = require("chai")
const {deployments, ethers, getNamedAccounts} = require("hardhat")



describe("FundMe" , async function(){
    let fundMe
    let deployer 
    let mockV3Aggregator
    const sendValue = 
     ethers.utils.parseEther("1") 
    // 1 Eth , parseEther converts 1 into 18 zeros
    beforeEach(async function() {
//fixture helps in running everyhng in the deploy folder
       await deployments.fixture(["all"])
//we can also do as
// const accounts = await ethers.getSigner()
// const accountZero = accounts[0]

       deployer = (await getNamedAccounts()).deployer
       //getContract gets the most recent deployment
       fundMe = await ethers.getContract("FundMe", deployer)
       mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)


    })


    describe ("constructor", async function() {

        it("sets the aggrgator addresses correctly", async function () {
           const response = await fundMe.getPriceFeed() 
           assert.equal(response, mockV3Aggregator.address)


        })
})

describe("fund", async function() {
    it("fails if u don send enough ETH", async function () {
        await expect(fundMe.fund()).to.be.revertedWith(
            "You need to spend more ETH!")
            //this statement should be same asw the statement in the fundme contract in order for it to pass
    })

    it("updates the amount funded data strcucture", async function() {
        await fundMe.fund({value: sendValue})
        //getAddressToAmountFunded is mapping of address to all the amount
        // const response = await fundMe.getAddressToAmountFunded(deployer.address)
        const response = await fundMe.getAddressToAmountFunded(deployer)
        assert.equal(response.toString(), sendValue.toString())
    })

    it("add funds to array of getFunders" , async function() {
        await fundMe.fund({ value: sendValue})
        const funder = await fundMe.getFunder(0)
        assert.equal(funder, deployer)
    })


})

describe("widthdraw " , async function(){
    //before withdraw we need to have some money dats what this is doing
beforeEach(async function () {
    await fundMe.fund({value:sendValue})
})

it("withdraw ETH from a single founder",async function() {
    //arrange
//     const startingfundmeBalance = await fundMe.provider.getBalance(
//         fundMe.address
//     )
//     const startingDeployerBalance = await fundMe.provider.getBalance(
//         deployer
//     )
//     //act
//     const transactionResponse = await fundMe.withdraw()
//     const transcationReceipt = await transactionResponse.wait(1)
//     const{gasUsed, effectiveGasPrice} = transcationReceipt
// //.mul to multiply 
//     const gasCost = gasUsed.mul(effectiveGasPrice)
    


//     const endingfundmeBalance = await fundMe.provider.getBalance(fundMe.address)
//     const endingdeployerBalance = await fundMe.provider.geṭBalance(
//         deployer
//     )
const startingFundMeBalance =
await fundMe.provider.getBalance(fundMe.address)
const startingDeployerBalance =
await fundMe.provider.getBalance(deployer)

// Act
const transactionResponse = await fundMe.withdraw()
const transactionReceipt = await transactionResponse.wait()
const { gasUsed, effectiveGasPrice } = transactionReceipt
const gasCost = gasUsed.mul(effectiveGasPrice)

const endingFundMeBalance = await fundMe.provider.getBalance(
fundMe.address
)
const endingDeployerBalance =
await fundMe.provider.getBalance(deployer)
    //assert
    assert.equal(endingFundMeBalance,0)
    assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),endingDeployerBalance.add(gasCost).toString())
})

// it("allows us to withdarw with multiple getFunders", async function(){

// const accounts = await ethers.getSigner()
// for(let i =1; i<6; i++) {
// const fundMeConnectedContract = await fundMe.connect(accounts[i])
// await fundMeConnectedContract.fund({value:sendValue})
// }
// const startingfundmeBalance =
// await fundMe.provider.getBalance(fundMe.address)
// const startingDeployerBalance =
// await fundMe.provider.getBalance(deployer)

// //Act
// const transactionResponse = await fundMe.withdraw()

//     const transactionReceipt = await transactionResponse.wait()
//                   const { gasUsed, effectiveGasPrice } = transactionReceipt
//                   const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
//                   console.log(`GasCost: ${withdrawGasCost}`)
//                   console.log(`GasUsed: ${gasUsed}`)
//                   console.log(`GasPrice: ${effectiveGasPrice}`)
// const endingfundmeBalance = await fundMe.provider.getBalance(
//                     fundMe.address
//                     )
//     const endingdeployerBalance =
//     await fundMe.provider.getBalance(deployer)

// //assert
// assert.equal(endingfundmeBalance,0)
// assert.equal(
//     startingfundmeBalance.add(startingDeployerBalance).toString(),endingdeployerBalance.add(gasCost).toString())

//     //make sure getFunders are reset properly

//     await expect(fundMe.getFunders(0)).to.be.reverted
//     for(i=1;i<6;i++){
//         assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
//     }



// })

// })


// })


it("is allows us to withdraw with multiple getFunders", async () => {
    // Arrange
    const accounts = await ethers.getSigners()
    for (i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(
            accounts[i]
        )
        await fundMeConnectedContract.fund({ value: sendValue })
    }
    const startingFundMeBalance =
        await fundMe.provider.getBalance(fundMe.address)
    const startingDeployerBalance =
        await fundMe.provider.getBalance(deployer)

    // Act
    // const transactionResponse = await fundMe.withdraw()
    // // Let's comapre gas costs :)
    // // const transactionResponse = await fundMe.withdraw()
    // const transactionReceipt = await transactionResponse.wait()
    // const { gasUsed, effectiveGasPrice } = transactionReceipt
    // const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
    // console.log(`GasCost: ${withdrawGasCost}`)
    // console.log(`GasUsed: ${gasUsed}`)
    // console.log(`GasPrice: ${effectiveGasPrice}`)
    // const endingFundMeBalance = await fundMe.provider.getBalance(
    //     fundMe.address
    // )
    // const endingDeployerBalance =
    //     await fundMe.provider.getBalance(deployer)
    const transactionResponse = await fundMe.withdraw()
const transactionReceipt = await transactionResponse.wait()
const { gasUsed, effectiveGasPrice } = transactionReceipt
const gasCost = gasUsed.mul(effectiveGasPrice)

const endingFundMeBalance = await fundMe.provider.getBalance(
fundMe.address
)
const endingDeployerBalance =
await fundMe.provider.getBalance(deployer)
assert.equal(endingFundMeBalance,0)
    assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),endingDeployerBalance.add(gasCost).toString())
}) 


    // Assert
    assert.equal(
        startingFundMeBalance
            .add(startingDeployerBalance)
            .toString(),
        endingDeployerBalance.add(withdrawGasCost).toString()
    )
    // Make a getter for storage variables
    await expect(fundMe.getFunder(0)).to.be.reverted

    for (i = 1; i < 6; i++) {
        assert.equal(
            await fundMe.getgetAddressToAmountFunded(
                accounts[i].address
            ),0)
    }
})
it("Only allows the owner to withdraw", async function () {
    const accounts = await ethers.getSigners()
    const attacker = accounts[1]
    const attackerConnectedContract = await fundMe.connect(attacker )
    await expect(
        attackerConnectedContract.withdraw()
    ).to.be.reverted
})

it("cheaper withdraw testing", async () => {
    // Arrange
    const accounts = await ethers.getSigners()
    for (i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(
            accounts[i]
        )
        await fundMeConnectedContract.fund({ value: sendValue })
    }
    const startingFundMeBalance =
        await fundMe.provider.getBalance(fundMe.address)
    const startingDeployerBalance =
        await fundMe.provider.getBalance(deployer)

    // Act
    // const transactionResponse = await fundMe.withdraw()
    // // Let's comapre gas costs :)
    // // const transactionResponse = await fundMe.withdraw()
    // const transactionReceipt = await transactionResponse.wait()
    // const { gasUsed, effectiveGasPrice } = transactionReceipt
    // const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
    // console.log(`GasCost: ${withdrawGasCost}`)
    // console.log(`GasUsed: ${gasUsed}`)
    // console.log(`GasPrice: ${effectiveGasPrice}`)
    // const endingFundMeBalance = await fundMe.provider.getBalance(
    //     fundMe.address
    // )
    // const endingDeployerBalance =
    //     await fundMe.provider.getBalance(deployer)
    const transactionResponse = await fundMe.cheaperWithdraw()
const transactionReceipt = await transactionResponse.wait()
const { gasUsed, effectiveGasPrice } = transactionReceipt
const gasCost = gasUsed.mul(effectiveGasPrice)

const endingFundMeBalance = await fundMe.provider.getBalance(
fundMe.address
)
const endingDeployerBalance =
await fundMe.provider.getBalance(deployer)
assert.equal(endingFundMeBalance,0)
    assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),endingDeployerBalance.add(gasCost).toString())
}) 


    // Assert
    assert.equal(
        startingFundMeBalance
            .add(startingDeployerBalance)
            .toString(),
        endingDeployerBalance.add(withdrawGasCost).toString()
    )
    // Make a getter for storage variables
    await expect(fundMe.getFunder(0)).to.be.reverted

    for (i = 1; i < 6; i++) {
        assert.equal(
            await fundMe.getgetAddressToAmountFunded(
                accounts[i].address
            ),0)
    }
})


