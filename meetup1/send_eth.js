#! /usr/bin/env node

// Thanks Jordan Leigh: https://www.youtube.com/watch?v=BFEzWYFZ7wA&t=275s
const Web3 = require('web3')
const Program = require('commander');
const EthTx = require('ethereumjs-tx')

Program
  .version('0.0.1')
  .option('-k, --key [key]', 'What is your wallet key?:')
  .option('-a, --address [address]', 'What is your wallet address?:')
  .option('-t, --to [address]', 'What is the address of the person you are sending the money to ?:')
  .parse(process.argv);

if (!Program.key || !Program.to) Program.help();

const ETHEREUM_NETWORK = process.env.ETHEREUM_NETWORK === undefined ? "http://localhost:8545" : process.env.ETHEREUM_NETWORK;
console.log("Ethereum network set as " + ETHEREUM_NETWORK);

const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_NETWORK))

if (!web3.isConnected()) { 
    console.log("ERROR! Unable to connect to the network at " + ETHEREUM_NETWORK);
    process.exit();
}

const theirAddr = Program.to;
const myPrivateKey = Program.key.slice(2);
const myAddr = Program.address;

// enable this for debugging. avoid printing private keys
//console.log("My Private key is " + myPrivateKey);
console.log("My Public  key is " + myAddr);
console.log("Sending 1 Ether to " + theirAddr);

const myTx = {
   nonce: web3.toHex(web3.eth.getTransactionCount(myAddr)),
   to: theirAddr,
   gasPrice: web3.toHex(21000000000),
   gasLimit: web3.toHex(21000),
   value: web3.toHex(web3.toWei(1,'ether')),
   data: ""
} 

const tx = new EthTx(myTx)
const pKeyHex = new Buffer(myPrivateKey,"hex")

tx.sign(pKeyHex)
const serializedTx=`0x${tx.serialize().toString('hex')}`
web3.eth.sendRawTransaction(serializedTx,(error,txid) => {
  if (!error) {
    console.log(txid)
    console.log(`Check transaction at https://rinkeby.etherscan.io/tx/${txid}`)
  } else {
    console.log(error)
  }
})

console.log("Balance in your account is : " + web3.fromWei(web3.eth.getBalance(myAddr)) + " ether.");
console.log("Balance in their account is : " + web3.fromWei(web3.eth.getBalance(theirAddr)) + " ether.");
