#! /usr/bin/env node

// Thanks Jordan Leigh video: https://www.youtube.com/watch?v=IV9pRBq5A4g
//  Not tested
const Program = require('commander');

const bitcore = require('bitcore-lib')
const explo = require('bitcore-explorers')

Program
  .version('0.0.1')
  .option('-k, --key [key]', 'What is your wallet key?:')
  .option('-a, --address [address]', 'What is your wallet address?:')
  .option('-t, --to [address]', 'What is the address of the person you are sending the money to ?:')
  .parse(process.argv);

if (!Program.key || !Program.to) Program.help();

console.log("Will Use Bitcore Bitcoin proxy nodes")

const theirAddr = Program.to;
const myPrivateKey = Program.key.slice(2);
const myAddr = Program.address;

// enable this for debugging. avoid printing private keys
//console.log("My Private key is " + myPrivateKey);
console.log("My Public  key is " + myAddr);
console.log("Sending 100 Satoshi to " + theirAddr);

// Link to how Bitcoin addresses are created
"https://en.bitcoin.it/wiki/Technical_background_of_version_1_Bitcoin_addresses#How_to_create_Bitcoin_Address"

// Connect your local shell with a remote BitPay node
var insight = new explo.Insight()
var shell = {}

// Get Info about an address
insight.address(myAddr, (error, result) => { shell.addr = result })
insight.getUnspentUtxos(addr, (error, result) => { shell.utxos = result })

// Create a Bitcoin transaction
var tx = bitcore.Transaction()
tx.from(utxoObject) // As many times as needed
tx.fee(feeAmount) // In Satoshis
tx.to(theirAddr, 100) // In Satoshis
tx.change(myAddr) // Send remaining balance back to this account
tx.addData() // Add metadata to the transaction
tx.sign(privateKey)
tx.serialize() // Check for errors

// Send the Bitcoin transaction to the live network
insight.broadcast(tx, (error, txId) => { 
    shell.error = error; shell.txId = txId 
    console.log(`Check transaction at https://live.blockcypher.com/btc/tx/${txId}`)
})
