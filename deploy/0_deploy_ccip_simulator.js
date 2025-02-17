//getNamedAccounts获取账户使用，deployments获取部署信息
const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {
    if(developmentChains.includes(network.name)){       
        const {firstAccount} = await getNamedAccounts()
        const {deploy, log} = deployments

        log("Deploying  CCIP Simulator contract...")
        // 部署合约， 参数是合约名字
        await deploy("CCIPLocalSimulator", {
            contract: "CCIPLocalSimulator",    //在部署哪个合约
            from: firstAccount,     //由谁部署的
            args: [],  //部署合约的需要输入的参数
            log: true,              //是否打印部署信息
        })
        log("CCIP Simulator contract...done!")
    }

}

// 当npx hardhat deploy --tags test或者all  时，会执行此脚本, 不写test/all或者其他的，不会执行此部署脚本
module.exports.tags = ["test", "all"]