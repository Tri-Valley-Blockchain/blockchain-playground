# Chapter 1 - Running a private ethereum blockchain

Start a new data directory to store the blockchain. Keep in mind that it won't work to add the data directory to the shared directory from VM host (~/eth-playground). I am usng /tmp here. Use your name to identify the node.

~~~shell
$ geth --identity "your_name" --datadir /tmp/eth-playground/data init genesis.json
~~~

Start the blockchain. The network id should be the same as chainId in config section of genesis.json

~~~shell
$ geth --datadir /tmp/eth-playground/data --networkid 94582
~~~

In another terminal window , connect to this blockchain and check the balance of one of the accounts created in genesis.json

~~~shell
$ geth attach /tmp/eth-playground/data/geth.ipc

 > eth.getBalance("7df9a875a174b3bc565e6424a0050ebc1b2d1d82")
 300000
~~~

