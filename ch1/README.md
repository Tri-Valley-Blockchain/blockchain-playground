# Chapter 1 - Running a private ethereum blockchain

Start a new data directory to store the blockchain. Keep in mind that it won't work to add the data directory to the shared directory from VM host (~/eth-playground). I am usng /tmp here. Use your name to identify the node.

~~~shell
$ geth --identity "your_name" --datadir /tmp/eth-playground/data init genesis.json
~~~

Start the blockchain. The network id should be the same as chainId in config section of genesis.json

~~~shell
$ geth --datadir /tmp/eth-playground/data --networkid 94582
~~~

In another terminal window , connect to this blockchain to create a new account and start mining.

~~~shell
$ geth attach /tmp/eth-playground/data/geth.ipc

 > personal.newAccount()
 Passphrase:
 Repeat passphrase:
 "0x64401fce28913b8003b3e716a3d70296d2354ef7"

 > eth.getBalance("0x64401fce28913b8003b3e716a3d70296d2354ef7")
 0
 > miner.start()
 null
~~~

