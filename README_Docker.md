# Ethereum Playground -- Docker Setup

Ethereum playground is a simple batteries-included development environment with all the tools needed pre-installed. It uses Docker to run a private ehtereum blockchain.

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

## Step by Step setup:

Follow these step by step instructions.

~~~shell
$ git clone git@github.com:trivalley-blockchain/eth-playground.git
$ cd eth-playground
$ . docker_functions
$ start_all <your-name>
~~~

You can look at the docker containers spawned (you should see 3)

~~~
$ docker ps
~~~

Now test the private ethereum blockchain running in your laptop:

~~~shell
$ curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' localhost:8545
{"jsonrpc":"2.0","id":67,"result":"Geth/v1.7.3-stable/linux-amd64/go1.9.2"}
~~~

When you are done and want to stop all docker containers:

~~~shell
stop_all
~~~

The above command will persist all the data across multiple starts and stops. To wipe everything and start again:

~~~shell
wipe_all
~~~