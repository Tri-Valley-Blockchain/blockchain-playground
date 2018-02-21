var HelloWorldBank = artifacts.require("HelloWorldBank");

module.exports = function(deployer) {
  deployer.deploy(HelloWorldBank);
};
