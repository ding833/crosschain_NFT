const { getNamedAccounts, ethers, deployments } = require("hardhat")
const { expect } = require("chai")

let firstAccount
let ccipSimulator
let nft
let wnft
let nftPoolBurnAndMint
let nftPoolLockAndRelease
let chainSelector

before(async function () {
    // prepare variables: contract, account
    firstAccount = (await getNamedAccounts()).firstAccount
    // deploy all contract
    await deployments.fixture(["all"])
    ccipSimulator = await ethers.getContract("CCIPLocalSimulator", firstAccount)
    nft = await ethers.getContract("MyToken", firstAccount)
    nftPoolLockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)
    wnft = await ethers.getContract("WrappedMyToken", firstAccount)
    nftPoolBurnAndMint = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)
    const config = await ccipSimulator.configuration()
    chainSelector = config.chainSelector_
})



describe("source chain -> dest chain tests", async function() {
    it("test if user can mint the nft contract successfully",
        async function() {
            //铸造一个
            await nft.safeMint(firstAccount)
            //TokenId为0的nft的有者地址，是否是firstAccount
            const owner = await nft.ownerOf(0)
            expect(owner).to.equal(firstAccount)
        }
    )

    it("test if user can lock the nft in the pool and send ccip message on source chain", 
        async function() {
            //把nft的权限提供给nftPoolLockAndRelease
            await nft.approve(nftPoolLockAndRelease.target, 0)
            //使用ccipSimulator给nftPoolLockAndRelase一些LINK
            await ccipSimulator.requestLinkFromFaucet(
                nftPoolLockAndRelease, ethers.parseEther("10"))
            //调用lockAndRelease函数, 发送ccip的msg
            await nftPoolLockAndRelease.lockAndSendNFT(
                0, firstAccount, chainSelector, nftPoolBurnAndMint.target)
            
            //验证原链上nft是否成功的转移到了nftPool
            const owner = await nft.ownerOf(0)
            expect(owner).to.equal(nftPoolLockAndRelease)
    })

    it("test if user can get a wrapped wnft dest chain", 
        async function() {
            const owner = await wnft.ownerOf(0)
            expect(owner).to.equal(firstAccount)
    })
})

describe("// dest chain -> source chain", async function() {
    it("test if user can burn the wnft and send ccip message on dest chain", 
        async function() {
            //把wft的权限提供给nftPoolBurnAndMint
            await wnft.approve(nftPoolBurnAndMint.target, 0)
            //使用ccipSimulator给nftPoolLockAndRelase一些LINK
            await ccipSimulator.requestLinkFromFaucet(
                nftPoolBurnAndMint, ethers.parseEther("10"))
            //调用lockAndRelease函数, 发送ccip的msg
            await nftPoolBurnAndMint.burnAndSendNFT(
                0, firstAccount, chainSelector, nftPoolLockAndRelease.target)
            
            //验证原链上池子的wnft数量为
            const tolalSupply = await wnft.totalSupply()
            expect(tolalSupply).to.equal(0)
            
    })

    it("test if user have the nft unlock on source chain", 
        async function () {
            const owner = await nft.ownerOf(0)
            expect(owner).to.equal(firstAccount)
    });
})
