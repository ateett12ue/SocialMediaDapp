require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEY;
console.log(privateKeys)
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "*" // Match any network id
    },
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       privateKeys.split(','), // Array of account private keys
    //       `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
    //     )
    //   },
    //   gas: 5000000,
    //   gasPrice: 25000000000,
    //   network_id: 3
    // }
    matic: {
      provider: () => new HDWalletProvider([`${privateKeys}`], 
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}