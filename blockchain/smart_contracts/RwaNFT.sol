// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.6;

import "@openzeppelin/contracts@3.3/token/ERC721/ERC721.sol";

contract RwaNFT is ERC721 {

    mapping (address => uint256) public wards;
    function rely(address usr) external auth { wards[usr] = 1; }
    function deny(address usr) external auth { wards[usr] = 0; }
    modifier auth {
        require(wards[msg.sender] == 1, "RwaNFT/not-authorized");
        _;
    }

    uint256 public tokenCounter;
    constructor () public ERC721 ("Real World Asset NFT", "RWA-NFT"){
        tokenCounter = 0;
        wards[msg.sender] = 1; //creator can modify
    }

    function createRwaNFT(string memory tokenURI) auth public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newItemId;
    }
}