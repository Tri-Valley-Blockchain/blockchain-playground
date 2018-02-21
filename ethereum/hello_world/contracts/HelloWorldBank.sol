pragma solidity ^0.4.18;

contract HelloWorldBank {

    // Maintains the balance of each account
    mapping (address => uint) accountBalances;    
    
    // declare a deposit function that takes an input called amount
    function deposit(uint amount) public {
        accountBalances[msg.sender] += amount;
    }
    
    // returns the balance
    function getBalance() public view returns (uint balance){
        return accountBalances[msg.sender];
    }

}
