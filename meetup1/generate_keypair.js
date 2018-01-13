#! /usr/bin/env node
const Web3 = require('web3')
const Program = require('commander');
const EthUtil = require("ethereumjs-util")

const ETHEREUM_NETWORK = process.env.ETHEREUM_NETWORK === undefined ? "http://localhost:8545" : process.env.ETHEREUM_NETWORK;
console.log("Ethereum network set as " + ETHEREUM_NETWORK);
const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_NETWORK))

Program
  .version('0.0.1')
  .option('-w, --password [password]', 'What is your wallet password/pass phrase?:')
  .parse(process.argv);

if (!Program.password) Program.help();


const passPhrase=Program.password.repeat(100)
const privateKey=web3.sha3(web3.sha3(passPhrase))

console.log("Private key is " + privateKey);

var hexToBytes = function (hex) {
    for (var bytes = [], c= 0; c < hex.length; c+=2) {
        bytes.push(parseInt(hex.substr(c,2),16))
        return bytes;
    }
}

var privateKeyToAddress = function(privateKey) {
    var pkey=new Buffer(privateKey,"hex");
    //let bytes = hexToBytes(privateKey)
    return `0x${EthUtil.privateToAddress(pkey).toString('hex')}`
}

console.log("Public  key / wallet address is " + privateKeyToAddress(privateKey.slice(2)));
