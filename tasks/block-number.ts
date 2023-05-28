import { task } from "hardhat/config";

export const blockNumberTask = task("block-number", "prints current block number").setAction(
  async (tasksArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);
