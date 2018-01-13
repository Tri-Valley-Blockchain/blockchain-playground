#! /usr/bin/env node

// Thanks Jordan Leigh: https://www.youtube.com/watch?v=IV9pRBq5A4g
const Program = require('commander');

const bitcore = require('bitcore-lib')
const explo = require('bitcore-explorers')


// Use the pass phrase/password to generate a keypair
Program
  .version('0.0.1')
  .option('-p, --password [password]', 'What is your wallet password/pass phrase?:')
  .parse(process.argv);

if (!Program.password) Program.help();

// The pass phrase/password is used to generate the private key. Different wallet software might have different ways
// of using the pass phrase to create the private key. This also allows you to recover the private key with a pass phrase
// in case you lose it. 
const slug=Program.password.repeat(100)
// Generate a new Bitcoin address
var hash = bitcore.crypto.Hash.sha256(new Buffer(slug))
var bn = bitcore.crypto.BN.fromBuffer(hash)
var privateKey = bitcore.PrivateKey(bn)
var addr = privateKey.toAddress()

console.log("BTC Private key is " + privateKey);
console.log("BTC Public  key / wallet address is " + addr)
console.log(`Check balance at https://live.blockcypher.com/btc/address/${addr}`)

