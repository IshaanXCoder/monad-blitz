// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WalletPersonalityNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor(address initialOwner) ERC721("WalletPersonalityNFT", "WPNFT") Ownable(initialOwner) {}

    function mintNFT(address to, string memory metadataURI) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        nextTokenId++;
    }
}