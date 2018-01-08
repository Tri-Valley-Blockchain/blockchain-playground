# Ethereum Playground

Ethereum playground is a simple batteries-included development environment with all the tools needed pre-installed. It uses Virtualbox to run a version of Ubunty Trusty Linux and builds it using Vagrant. Please use the links in the pre requisites section to install Virtualbox and Vagrant in your Operating system (whether it is Mac, Windows or Linux).

## Pre Requisites

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

You now have a working environment to do your ethereum development. eth-playground directory will be in the home directory when you ssh into your VM.

~~~shell
$ vagrant ssh
$ cd eth-playground
~~~

Use the README file of individual chapter directories to start development.