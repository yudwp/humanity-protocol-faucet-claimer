# 🚀 Humanity Protocol Faucet Claimer

A script to automate token claiming from the **Humanity Protocol Testnet Faucet**. Designed to help developers and testers receive testnet tokens regularly without manually submitting requests.

---

## 📌 Features

- ⏱ **Auto Claim** every 60 seconds
- 🔒 **Wallet Address Validation** (via `ethers.js`)
- 🌈 **Colorful CLI Output** (via `chalk`)
- 🔁 **Continuous Loop** until manually stopped
- 🧠 **Smart Handling**: Automatic retries and error handling

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yudwp/humanity-protocol-faucet-claimer.git
cd humanity-protocol-faucet-claimer
```

2. **Install dependencies:**

```bash
npm install
```

---

## 🚀 Usage

Run the script with:

```bash
npm start
```

Enter your Ethereum wallet address when prompted.

---

## 🛠 Built With

- [Node.js](https://nodejs.org/)
- [axios](https://github.com/axios/axios) - HTTP requests
- [chalk](https://github.com/chalk/chalk) - CLI coloring
- [ethers.js](https://github.com/ethers-io/ethers.js/) - Wallet address validation

---

## 🧪 Sample Output

```bash
[05:44:04] Enter your wallet address to begin: 0x3b11...
[05:44:18] Wallet address validated: 0x3B11...
[05:44:18] Initializing...
[05:44:18] --------------------------------------------------
[05:44:18] Sending claim request for address: 0x3B11...
[05:44:18] Checking faucet status from server...
[05:44:19] Status: available
[05:44:19] Claim successful!
[05:44:19] Transaction Hash: 0x5057...
```

---

## ❗️ Notes

- This script is **strictly for Humanity Protocol's testnet faucet**.
- Do not use your primary wallet — use a separate wallet for testing purposes.
- Please use responsibly and avoid abusing the faucet system.

---

## 📄 License

MIT License © 2025 [yudwp](https://github.com/yudwp)

---
