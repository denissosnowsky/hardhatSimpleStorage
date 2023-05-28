import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { assert, expect } from "chai";

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
  });

  it('should store number', async () => {
    const expectedValue = '7';

    const txResponse = await simpleStorage.store(expectedValue);
    await txResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();

    expect(updatedValue.toString()).to.equal(expectedValue);
  });
});
