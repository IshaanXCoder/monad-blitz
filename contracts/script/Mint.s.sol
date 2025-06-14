// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {WalletPersonalityNFT} from "../src/contract.sol";

contract MintScript is Script {
    function run() external {
        // Load private key
        // uint256 deployerPK = vm.envUint("PRIVATE_KEY");
        // address receiver = vm.addr(deployerPK); // You can also hardcode another address here
        address receiver = 0xEEd4CE443FE6e5b7372f87444d5d263A349797F8;

        // Metadata URI (Pinata IPFS)
        string memory metadataURI = "ipfs://bafybeihwtu3gm5q4kxv65aqhs2wnffhgdojdto2qr5os55fnkqbe364p3a/1.json";

        vm.startBroadcast();
        WalletPersonalityNFT nft = WalletPersonalityNFT(vm.envAddress("NFT_CONTRACT_ADDRESS"));
        nft.mintNFT(receiver, metadataURI);
        console2.log("NFT contract address:", address(nft));
        vm.stopBroadcast();
    }
}