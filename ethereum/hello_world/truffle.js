var HDWalletProvider = require("truffle-hdwallet-provider");

//var mnemonic = "I am Chandra Siva Tri Valley Block Chain Meetup Group Elite Member";
var mnemonic = "coin disorder solution few bottom minute jeans real certain balcony future salad";
var providerUrl = "https://rinkeby.infura.io/JXZDq9m1Wu9GibU35qL0";

module.exports = {
  networks: {
    rinkeby: {
      network_id: 4,    // Official ropsten network id
      provider: new HDWalletProvider(mnemonic, providerUrl) // The actual api key infura gave you
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
};
