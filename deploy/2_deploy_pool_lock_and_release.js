const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

//getNamedAccounts获取账户使用，deployments获取部署信息
module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy, log} = deployments

    log("Deploying  PoolLockAndRelease contract...")
    let sourceChainRouter
    let linkTokenAddr
    if(developmentChains.includes(network.name)){
        //本地部署mock合约
        //获取CCIPSimulator合约  
        const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator") //CCIPLocalSimulator获取部署信息
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address) //获取合约
        //获取ccipSimulator中的配置
        const ccipConfig = await ccipSimulator.configuration()
        sourceChainRouter = sourceChainRouter = ccipConfig.sourceRouter_
        linkTokenAddr = linkTokenAddr = ccipConfig.linkToken_
    }else{
        //线上网络环境，chainLinkCCIP提供的合约
        sourceChainRouter = networkConfig[network.config.chainId].router
        linkTokenAddr = networkConfig[network.config.chainId].linkToken
    }

    //nft合约
    const nftDeployment = await deployments.get("MyToken")
    const nftAddr = nftDeployment.address

    // 部署原链的池子
    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",  //部署的哪个合约
        from: firstAccount,     // 谁在部署合约
        log: true,
        // address _router, address _link, address nftAddr
        args: [sourceChainRouter, linkTokenAddr, nftAddr]
    })

    log("NFTPoolLockAndRelease contract...successfully done!")
}

module.exports.tags = ["sourcechain", "all"]