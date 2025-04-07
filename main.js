const readline = require("readline");
const axios = require("axios");
const { getAddress } = require("ethers");
const chalk = require("chalk");

function getTimestamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `[${hours}:${minutes}:${seconds}]`;
}

function printBanner() {
  console.clear();
  console.log(chalk.blue(`
██╗   ██╗██╗   ██╗██████╗ ██╗    ██╗██████╗ 
╚██╗ ██╔╝██║   ██║██╔══██╗██║    ██║██╔══██╗
 ╚████╔╝ ██║   ██║██║  ██║██║ █╗ ██║██████╔╝
  ╚██╔╝  ██║   ██║██║  ██║██║███╗██║██╔═══╝ 
   ██║   ╚██████╔╝██████╔╝╚███╔███╔╝██║     
   ╚═╝    ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝     
                                            
[FAUCET] Humanity Protocol - Auto Claim
==============================================================
`));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askAddress = () => {
  return new Promise((resolve) => {
    rl.question(`${getTimestamp()} ${chalk.cyan("Input your wallet address: ")}`, (address) => {
      resolve(address);
      rl.close();
    });
  });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkFaucetStatus() {
  try {
    console.log(`${getTimestamp()} ${chalk.magenta("Checking faucet status from server...")}`);
    await axios.get("https://faucet.testnet.humanity.org/api/info");
    return "Available";
  } catch (error) {
    console.error(`${getTimestamp()} ${chalk.red("Failed to retrieve faucet info:")} ${error.message}`);
    return null;
  }
}

async function startAutoClaim() {
  try {
    const addressInput = await askAddress();
    const address = getAddress(addressInput);
    console.log(`${getTimestamp()} ${chalk.green("Wallet address validated:")} ${address}`);
    console.log(`${getTimestamp()} ${chalk.green("Initializing...")}`);
    while (true) {
      try {
        console.log(`${getTimestamp()} ${chalk.cyan("--------------------------------------------------")}`);
        console.log(`${getTimestamp()} ${chalk.cyan("Sending claim request for address:")} ${address}`);
        const status = await checkFaucetStatus();
        if (!status) {
          console.warn(`${getTimestamp()} ${chalk.yellow("Faucet status unavailable. Retrying...")}`);
          await delay(5000);
          continue;
        }
        console.log(`${getTimestamp()} ${chalk.blue("Status:")} available`);
        const response = await axios.post(
          "https://faucet.testnet.humanity.org/api/claim",
          { address }
        );
        const txHash = response.data.msg.split("Txhash: ")[1];
        console.log(`${getTimestamp()} ${chalk.green("Claim successful!")}`);
        console.log(`${getTimestamp()} ${chalk.green("Transaction Hash:")} ${txHash}`);
        console.log(`${getTimestamp()} ${chalk.cyan("Waiting 60 seconds before next claim...")}`);
        await delay(60000);
      } catch (error) {
        console.error(`${getTimestamp()} ${chalk.red("Claim failed!")}`);
        if (error.response && error.response.data && error.response.data.msg) {
          console.error(`${getTimestamp()} ${chalk.red("Reason:")} ${error.response.data.msg}`);
        } else {
          console.error(`${getTimestamp()} ${chalk.red("Error:")} ${error.message}`);
        }
        console.log(`${getTimestamp()} ${chalk.yellow("Waiting 5 seconds before retry...")}`);
        await delay(5000);
      }
    }
  } catch (error) {
    console.error(`${getTimestamp()} ${chalk.red("Fatal error occurred:")} ${error}`);
    process.exit(1);
  }
}

printBanner();
startAutoClaim();

process.on("SIGINT", () => {
  console.log(`${getTimestamp()} ${chalk.red("Script interrupted. Goodbye!")}`);
  process.exit(0);
});
