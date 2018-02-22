# Step by Step instructions to build Hello World Smart Contract

~~~shell
# cd code
# truffle version
Truffle v4.0.5 (core: 4.0.5)
Solidity v0.4.18 (solc-js)
~~~

Install node modules that this project depends on.

~~~shell
# truffle init
~~~

Truffle will create a scaffold project with a directory structure.

Time to create HelloWorldBank smart contract. under contracts/ create a HelloWorldBank.sol wwith the following contents:

~~~shell
pragma solidity ^0.4.18;

contract HelloWorldBank {

    // Maintains the balance of each account
    mapping (address => uint) accountBalances;    
    
    // declare a deposit function that takes an input called amount
    function deposit(uint amount) public {
        accountBalances[msg.sender] += amount;
    }
    
    // returns the balance
    function getBalance() public view returns (uint balance){
        return accountBalances[msg.sender];
    }

}
~~~

Now to deploy this contract you need a migration script called 2_deploy_contracts.js under migrations/

~~~shell
var HelloWorldBank = artifacts.require("HelloWorldBank");

module.exports = function(deployer) {
  deployer.deploy(HelloWorldBank);
};
~~~

Before we can deploy this smart contract to the Rinkeby network  , we need to setup truffle.js with an account with some ether that can add the smart contract to the ethereum blockchain. 

The following has my rinkeby test account and my infura account. If you have metamask account with ether in the rinkeby test network use that mnemonic instead of the one below. Please take care to NOT use the metamask account that you use with the mainnet and REAL ether. 

~~~shell
var HDWalletProvider = require("truffle-hdwallet-provider");

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
~~~

Install dependency truffle-hdwallet-provider

~~~

# npm install truffle-hdwallet-provider

~~~

Compile all the smart contracts and deploy themem to Rinkeby

~~~

# truffle compile
# truffle migrate --reset --network rinkeby
# truffle migrate --network rinkeby

~~~

You should see an output as follows:

~~~shell
root@c21cd13a77a6:~/code# truffle migrate --reset --network rinkeby
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x8539140fdd03e8a0ad278a34be2114ac7151950408910c66c984532a8c60b017
  Migrations: 0xf60d57d068e719f7997032405315b692e704835a
Saving successful migration to network...
  ... 0xc02103874ba02f04008270f4a82614ed8e82ee5405241cdae72ab60e4fa84fcd
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing HelloWorldBank...
  ... 0xde036e948ed445f05a919f7dc348db1b8666fa1ccee23d8281b2c7365cecb071
  HelloWorldBank: 0x546b1d33850df0d78e1c9c4fda4d48fd49f5a8df
Saving successful migration to network...
  ... 0xe11c4c8054035752eef5e336874bb07095bf19b84bdecaf1c09b2582113e9517
Saving artifacts...
root@c21cd13a77a6:~/code#
~~~

HelloWorldBank: 0x546b1d33850df0d78e1c9c4fda4d48fd49f5a8df shows the smart contract account in this case. You can look at this account by going to [Etherscan](https://rinkeby.etherscan.io/address/0x546b1d33850df0d78e1c9c4fda4d48fd49f5a8df). You can also click on the code tab to see the contract code. 


Interacting with the smart contract using truffle console

~~~shell
# truffle console --network rinkeby
~~~
Lets first invoke the deposit method of the smart contract to send 1000:

~~~shell
HelloWorldBank.deployed().then(instance => instance.deposit.sendTransaction(1000)).then(result => balance = result);
~~~

Now lets check the balance 

~~~shell
HelloWorldBank.deployed().then(instance => instance.getBalance.call()).then ( result => balance = result);
balance.toString()
~~~

You can invoke the deposit method multiple times and see the balance increase. But the change will not be immediate as the transaction has to be mined and become part of the blockchain.
