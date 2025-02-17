const { task } = require("hardhat/config")

task("mint-nft").setAction(async(taskArgs, hre) => {
    const { firstAccount } = await getNamedAccounts()
    const nft = await ethers.getContract("MyToken", firstAccount)
    
    console.log(`minting nft from contract`);
    const mintTx = await nft.safeMint(firstAccount)
    await mintTx.wait(6)
    console.log(`mint nft success`)
})

module.exports = {}