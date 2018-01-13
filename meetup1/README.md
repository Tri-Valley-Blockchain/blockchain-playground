## Meetup 1 - 17/01/2018 - Hands-on with web3.js

# What we will cover in this meetup:

1. Generate a public/private keypair using node.js console (web3 apis as needed).
2. Use web3 to connect to a ethereum testnet like rapsten via infura.io with the api keys and our keypair (so infura knows how to sign our transactions). (edited)
3. Add some eth to the above generated keypair  using https://faucet.rinkeby.io/
4. Create a json object on the node.js console for a eth transfer transaction between one meetup participant and the person sitting next to them or anyone else.
5. Sign it, send it
6. Use etherscan to confirm it. also use web api on the recepient's node.js console to confirm it.

# Code

https://gist.github.com/lakamsani/b20fed6c5172c7fee781675a6c61798c

# Sample scripts

This directory has some sample scripts based on what you learned today.

```shell

$ export ETHEREUM_NETWORK="https://rinkeby.infura.io/<your-infura-key>"
$ npm install
$ ./generate_keypair.js  --password <your-secret-password>
$ ./check_balance.js --address <your-public-key-address>
$ ./send.js --key <your-private-key-from-above> --address <your-public-key-from-above> --to <your-friends-public-key>

```

