// Setup: npm install alchemy-sdk
// Run with: node script.js

import { Alchemy, Network } from "alchemy-sdk";
import fs from "fs";

const config = {
  apiKey: "H5ENWKHWtNLwaqHlDD3Eh5ZYsswr49br",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const saveToFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

const main = async () => {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });

  console.log("Saving output to transactions.json...");
  saveToFile("transactions.json", data);
};

main();