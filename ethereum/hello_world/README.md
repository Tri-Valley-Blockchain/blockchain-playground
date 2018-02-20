# Hello World Smart Contract

A simple truffle project shows how to build a hello world smart contract and deploy it to a test chain.

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
$ git clone git@github.com:Tri-Valley-Blockchain/blockchain-playground.git
$ cd ethereum/hello_world
$ docker-compose up -d hello_world 
$ docker exec -it hello_world bash
```

Now you are inside the docker container running your development environment. 

```shell
$ cd code
# truffle version
Truffle v4.0.5 (core: 4.0.5)
Solidity v0.4.18 (solc-js)
```

Once you are done with all of your work, simply do the following to shut everything down and remove in your host mac or PC.

```shell
$ docker-compose down
```
