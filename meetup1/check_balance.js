#! /usr/bin/env node

const Web3 = require('web3')
const Program = require('commander');

const ETHEREUM_NETWORK = process.env.ETHEREUM_NETWORK === undefined ? "http://localhost:8545" : process.env.ETHEREUM_NETWORK;
console.log("Ethereum network set as " + ETHEREUM_NETWORK);
const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_NETWORK))

Program
  .version('0.0.1')
  .option('-a, --address [address]', 'What is your wallet address:')
  .parse(process.argv);

if (!Program.address) Program.help();

address=Program.address;

console.log("Wallet address is " + address);
console.log('The ether balance is ' + web3.eth.getBalance(address).toNumber() + ' Wei.');
