// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import {WalletPersonalityNFT} from "../src/contract.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        WalletPersonalityNFT nft = new WalletPersonalityNFT(msg.sender);
        console2.log("Contract deployed at:", address(nft));

        vm.stopBroadcast();
    }
}