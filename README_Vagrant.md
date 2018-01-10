# Ethereum Playground -- Vagrant Setup

Ethereum playground is a simple batteries-included development environment with all the tools needed pre-installed. It uses Virtualbox to run a version of Ubunty Trusty Linux and builds it using Vagrant. Please use the links in the pre requisites section to install Virtualbox and Vagrant in your Operating system (whether it is Mac, Windows or Linux).

## Pre Requisites

Mac OS / Windows or Linux machine with at least 2GB of RAM for VM

Download and Install Virtualbox from : https://www.virtualbox.org/wiki/Downloads. You can check the version of VirtualBox and Vagrant to ensure everything is installed correctly.

~~~shell
$ VBoxManage --version
5.0.14r105127
~~~

Download and Install Vagrant from : https://www.vagrantup.com/

~~~shell
$  vagrant -v
Vagrant 2.0.1
~~~


## Step by Step setup:

Clone this repository from github.

~~~shell
git clone git@github.com:trivalley-blockchain/eth-playground.git
cd eth-playground
~~~

Build the eth playground VM. The following command will take 5 minutes depending on your internet connection if you are doing this for the first time as it has to download an image of Ubuntu Trusty.

~~~shell
$ vagrant up
~~~

SSH into your ethereum playground (Ubuntu Trusty)

~~~shell
$ vagrant ssh
$ cd eth-playground
~~~

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

Use the README file of individual chapter directories to start development.

