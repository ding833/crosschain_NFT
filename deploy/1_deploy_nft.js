const { Contract } = require("ethers")

//getNamedAccounts获取账户使用，deployments获取部署信息
module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts()
    const {deploy, log} = deployments

    log("Deploying  NFT contract...")
    // 部署合约， 参数是合约名字
    await deploy("MyToken", {
        contract: "MyToken",    //在部署哪个合约
        from: firstAccount,     //由谁部署的
        args: ["MyToken", "MT"],  //部署合约的需要输入的参数
        log: true,              //是否打印部署信息
    })
    log("Deploying  NFT contract...done!")
}

// 当npx hardhat deploy --tags sourcechain或者all  时，会执行此脚本, 不写sourcechain/all或者其他的，不会执行此部署脚本
module.exports.tags = ["sourcechain", "all"]