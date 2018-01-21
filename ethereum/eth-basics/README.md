# Ethereum Basics

Use these scripts to learn how ethereum wallets and transactions work.

## Pre Requisites

Mac OS / Windows or Linux machine with at least 2GB of RAM for VM to spare.

Download and Install Docker from : https://store.docker.com/search?offering=community&type=edition

Download and Install Git: https://git-scm.com/downloads

~~~shell
$ docker --version
Docker version 17.09.1-ce, build 19e2cf6

$ git --version
git version 2.14.3 (Apple Git-98)
~~~

```shell
$ git clone git@github.com:trivalley-blockchain/eth-playground.git
$ cd eth-basics
$ docker-compose up -d eth-basics rinkeby
$ docker exec -it eth-basics bash
```

Now you are inside the docker container running your development environment. 

```shell
$ cd code
$ export ETHEREUM_NETWORK="http://rinkeby:8545"
$ npm install # You can safely ignore the warnings
$ ./generate_keypair.js  --password <your-secret-password>
$ ./check_balance.js --address <your-public-key-address>
```

Your balance will show as zero , as you don't hold any ether. To get test ethereum in rinkeby test network go to [Rinkeby Faucet](https://www.rinkeby.io/#faucet). You will need to make some social media posts with the public address of the wallet generated above to get some ethereum in it.

Once you acquire some ethereum, find someone to send this ethereum to by asking for their public address. 

```shell
$ ./send.js --key <your-private-key-from-above> --address <your-public-key-from-above> --to <your-friends-public-key>
```

Once you are done with all of your work, simply do the following to shut everything down and remove.

```shell
docker-compose down
```

