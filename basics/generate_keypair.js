#! /usr/bin/env node
// Thanks Jordan Leigh: https://www.youtube.com/watch?v=YWoBeoTUrYM&t=251s
// Web3 and other required depenendcies

const Web3 = require('web3')
const Program = require('commander');
const EthUtil = require("ethereumjs-util")

// The Ethereum network to connect to. If environment variable  is set use that, otherwise connect to a local network by default.
const ETHEREUM_NETWORK = process.env.ETHEREUM_NETWORK === undefined ? "http://localhost:8545" : process.env.ETHEREUM_NETWORK;
console.log("Ethereum network set as " + ETHEREUM_NETWORK);

const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_NETWORK))

// If unable to connect to the netework, exit
if (!web3.isConnected()) { 
    console.log("ERROR! Unable to connect to the network at " + ETHEREUM_NETWORK);
    process.exit();
}

// Use the pass phrase/password to generate a keypair
Program
  .version('0.0.1')
  .option('-p, --password [password]', 'What is your wallet password/pass phrase?:')
  .parse(process.argv);

if (!Program.password) Program.help();

// The pass phrase/password is used to generate the private key. Different wallet software might have different ways
// of using the pass phrase to create the private key. This also allows you to recover the private key with a pass phrase
// in case you lose it. 
const passPhrase=Program.password.repeat(100)
const privateKey=web3.sha3(web3.sha3(passPhrase))

console.log("ETH Private key is " + privateKey);

// The following two functions are extracting the public key from the private key.
// VERY IMPORTANT NOTE: You can go from private key to a public key deterministically but 
// it is computationally impossible (until perhaps a quantum computer) to go from a public key to its private key
var hexToBytes = function (hex) {
    for (var bytes = [], c= 0; c < hex.length; c+=2) {
        bytes.push(parseInt(hex.substr(c,2),16))
        return bytes;
    }
}

var privateKeyToAddress = function(privateKey) {
    var pkey=new Buffer(privateKey,"hex");
    return `0x${EthUtil.privateToAddress(pkey).toString('hex')}`
}
const addr = privateKeyToAddress(privateKey.slice(2))
console.log("ETH Public  key / wallet address is " + addr)
console.log(`Check balance at https://rinkeby.etherscan.io/address/${addr}`)
