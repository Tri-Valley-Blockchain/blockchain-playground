# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
Vagrant.require_version ">= 1.5"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "eth-sandbox"

  config.vm.synced_folder ".", "/home/vagrant/eth-playground"
  config.vm.network "forwarded_port", guest: 8545, host: 8545
  config.vm.network "forwarded_port", guest: 8546, host: 8546
  config.vm.network "forwarded_port", guest: 30303, host: 30303
  config.vm.network "forwarded_port", guest: 30304, host: 30304

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  config.vm.provider "virtualbox" do |vb|
    # Set the name of the VM
    vb.name = "eth-sandbox"
    # Use VBoxManage to customize the VM. For example, to change memory and
    # allow symlinks to be created in the shared folder (ex: node_modules):
    vb.customize ["modifyvm", :id, "--memory", "512"]
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/proj-name", "1"]
  end

  # Install's latest version of Chef using vagrant-omnibus plugin.
  config.vm.provision "shell", :inline => $initial_compile
end

$initial_compile = <<SCRIPT
#!/usr/bin/env bash

echo "Bootstrapping host `hostname`"
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update -y
sudo apt-get install -y  ethereum
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g ganache-cli
sudo apt-get install -y git
sudo apt-get install -y build-essential
sudo npm install -g truffle
sudo npm install -g solc
sudo npm install -g yarn

SCRIPT
