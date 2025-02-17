// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import {MyToken} from "./MyToken.sol";

contract WrappedMyToken is MyToken {
    constructor(string memory tokenName, string memory tokenSymbol)
        MyToken(tokenName, tokenSymbol){}

    // 这里可以做一些权限控制，只允许ccip的合约调用此函数
    function mintTokenWithSpecificTokenId(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

}