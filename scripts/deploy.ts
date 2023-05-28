import { ethers, run, network } from "hardhat";
import 'dotenv/config';

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract address: ${simpleStorage.address}`);

  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    console.log('Waiting for blocks...');
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, [])
  }

  const currentNumber = await simpleStorage.retrieve();
  console.log(`Current number: ${currentNumber}`);
  
  const txResponse = await simpleStorage.store(7);
  await txResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
}

async function verify(contractAddress: string, args: Array<unknown>) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if ((e as Error).message.toLowerCase().includes("already verified")) {
      console.log("Already verified!!!");
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
