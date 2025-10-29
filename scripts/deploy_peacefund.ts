import { ethers } from "hardhat";
import { writeFileSync, mkdirSync, existsSync } from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const PeaceFund = await ethers.getContractFactory("PeaceFund");
  const peaceFund = await PeaceFund.deploy();
  await peaceFund.waitForDeployment();
  const addr = await peaceFund.getAddress();

  const out = { network: process.env.HARDHAT_NETWORK || "unknown", PeaceFund: addr, timestamp: Date.now() };

  if (!existsSync("deployments")) mkdirSync("deployments");
  writeFileSync("deployments/bsctest.json", JSON.stringify(out, null, 2));

  console.log(JSON.stringify(out)); // single line for CI logs
}

main().catch((e) => { console.error(e); process.exit(1); });
