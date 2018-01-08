# Chapter 1 - Running a private ethereum

# init data directory
$ geth --identity "chandra" --datadir /tmp/eth-playground/data init genesis.json

# start blockchain. The network id should be the same as chainId in config section of genesis.json
$ geth --datadir /tmp/eth-playground/data --networkid 94582

# In another terminal window , connect to this blockchain and do some mining
$ geth attach /tmp/eth-playground/data/geth.ipc

 > personal.newAccount()
 Passphrase:
 Repeat passphrase:
 "0x64401fce28913b8003b3e716a3d70296d2354ef7"

 > eth.getBalance("0x64401fce28913b8003b3e716a3d70296d2354ef7")
 0
 > miner.start()
 null

