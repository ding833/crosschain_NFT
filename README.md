项目名称：crosschain_NFT 

项目描述:  使用Chainlink CCIP消息跨链协议，实现的跨链NFT，合约分别在两个链上有两个NFT池（资产池子），第一个池子锁定NFT，在第二个池子释放NFT，实现NFT的跨链。

测试：项目使用Chainlink-local工具和本地单元测试进行测试

合约标准：NFT非同质化代币，合约使用ERC-721标准

数据存储：大型去中心化存储网络: IPFS，IPFS是一个点对点的网络，非许可，可验证；filebase网站提供基于IPFS网络的存储

开发流程：编写合约——>编写js部署脚本——>单元测试——>多链配置文件helper-hardhat-config.js——>
任务task
