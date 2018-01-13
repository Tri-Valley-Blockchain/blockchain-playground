#! /usr/bin/env node

// Thanks Jordan Leigh: https://www.youtube.com/watch?v=GdIlGYOQ7_k&t=386s
const Program = require('commander');

const lodash = require('lodash')
const xmrtools = require('xmr-dev-tools')

// Use the pass phrase/password to generate a keypair
Program
  .version('0.0.1')
  .option('-p, --password [password]', 'What is your wallet password/pass phrase?:')
  .parse(process.argv);

if (!Program.password) Program.help();

// The pass phrase/password is used to generate the private key. Different wallet software might have different ways
// of using the pass phrase to create the private key. This also allows you to recover the private key with a pass phrase
// in case you lose it. 
var seed=Program.password
lodash.times(1000, (i) => { seed = jssha3.sha3_256(seed) })
var wallet = new XMR({seed: seed})
console.log("XMR wallet keys are " + JSON.stringify(wallet.keys));
console.log("XMR wallet address is " + JSON.stringify(wallet.address));
process.exit(0)
