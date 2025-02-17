const { task } = require("hardhat/config")

task("check-nft").setAction(async(taskArgs, hre) => {
    const { firstAccount } = await getNamedAccounts()
    const nft = await ethers.getContract("MyToken", firstAccount)
    // 获取nft合约总共有多少个nft, 即：nft的数量
    const totalSupply = await nft.totalSupply()
    console.log(`checking status of MyToken`)
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
        const owner = nft.ownerOf(tokenId)
        console.log(`tokenId: ${tokenId} owner: ${owner}`)
    }
})

module.exports = {}