# Deconstructing CryptoCelebrities

If you thought [CryptoKitties](https://cryptokitties.io) and [CryptoZombies](https://cryptozombies.io) were the only crypto games in town, you would be wrong. There is a new kid on the block, [CryptoCelebrities](https://cryptocelebrities.co/). I thought it would be fun to read the crypto celebrities smart contract and deconstruct it to understand how such apps are built.

Before we start, there are a few things you need to understand before you can dive deep into the code. You need to understand how blockchain works and how smart contracts work on top of the blockchain. It helps if you know solidity (the language thats used to write smart contracts in Ethereum). However, even if you don't know or ever used solidity,if you know any higher level language you should be able to follow the code fairly easily.

## CryptoCelebrities Smart Contract

The smart contract for CryptoCelebrities is at : https://etherscan.io/address/0xbb5Ed1EdeB5149AF3ab43ea9c7a6963b3C1374F7#code. It is less than 500 lines of solidity code (including the common SafeMath library and the ERC721  non-fungible token contract).

Every celebrity in the CryptoCelebrities universe is a non-fungible token with a price.

### ERC721 tokens or Non-fungible tokens

ERC stands for Ethereum Request for Comments (similar to RFCs in standards bodies), ERC721 defines a standard contract that all non fungible tokens sjould implement (non fungible tokens are tokens that are unique and are NOT interchangeable). There is another standard called ERC20 for fungible tokens (where one token can be exchanged for another token in the network).

```solidity
contract ERC721 {
  // Required methods
  function approve(address _to, uint256 _tokenId) public;
  function balanceOf(address _owner) public view returns (uint256 balance);
  function implementsERC721() public pure returns (bool);
  function ownerOf(uint256 _tokenId) public view returns (address addr);
  function takeOwnership(uint256 _tokenId) public;
  function totalSupply() public view returns (uint256 total);
  function transferFrom(address _from, address _to, uint256 _tokenId) public;
  function transfer(address _to, uint256 _tokenId) public;

  event Transfer(address indexed from, address indexed to, uint256 tokenId);
  event Approval(address indexed owner, address indexed approved, uint256 tokenId);

  // Optional
  // function name() public view returns (string name);
  // function symbol() public view returns (string symbol);
  // function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256 tokenId);
  // function tokenMetadata(uint256 _tokenId) public view returns (string infoUrl);
}
```

The first part of the smart contract are some of the constants used later in the contract. It defines the symbol for this token as CelebrityToken. There is also a ```PROMO_CREATION_LIMIT``` of 5000. We will see this used later in the smart contract. This is the maximum number of ceebrities that can be added by the creators of this smart contract with a pre determined price. All other celebrities that are created will have to start at the starting price of .001 ether. 

```solidity
  /*** CONSTANTS ***/

  /// @notice Name and symbol of the non fungible token, as defined in ERC721.
  string public constant NAME = "CryptoCelebrities"; // solhint-disable-line
  string public constant SYMBOL = "CelebrityToken"; // solhint-disable-line

  uint256 private startingPrice = 0.001 ether;
  uint256 private constant PROMO_CREATION_LIMIT = 5000;
  uint256 private firstStepLimit =  0.053613 ether;
  uint256 private secondStepLimit = 0.564957 ether;
```

The next part of the smart contract is all the data stored in this smart contract account. This is where all the cryptocelebrities data is stored. As you will see NOT all of the data you see in cryptocelebrities.io are stored in the smart contract. For eg., a celebrity is represented by the Person struct in this smart contract, the struct only has a name. The image , description, id, short name , bio etc are not stored in the blockchain.

```solidity
  /*** STORAGE ***/

  /// @dev A mapping from person IDs to the address that owns them. All persons have
  ///  some valid owner address.
  mapping (uint256 => address) public personIndexToOwner;
```

This mapping goes from the owner wallet address to the number of tokens they own. 

```solidity
  // @dev A mapping from owner address to count of tokens that address owns.
  //  Used internally inside balanceOf() to resolve ownership count.
  mapping (address => uint256) private ownershipTokenCount;
```

This is a mapping of the person ID and the corresponding wallet address that is allowed to get this token. This is really for ERC721 compliance and there is no functionality in the site that allows a user that owns a celebrity to transfer it to someone else.

```
  /// @dev A mapping from PersonIDs to an address that has been approved to call
  ///  transferFrom(). Each Person can only have one approved address for transfer
  ///  at any time. A zero value means no approval is outstanding.
  mapping (uint256 => address) public personIndexToApproved;
```

This is the mapping of the personId and the current price in Wei.

```
  // @dev A mapping from PersonIDs to the price of the token.
  mapping (uint256 => uint256) private personIndexToPrice;
```

ceoAddress and cooAddress are wallet addresses that have special previliges. These are set initially to the wallet that deploys the contracts. It can then be changed to a different wallets by the CEO address. The CEO and COO wallets can also payout (transfer the ether in the smart contract account to another account).

```
  // The addresses of the accounts (or contracts) that can execute actions within each roles.
  address public ceoAddress;
  address public cooAddress;
```

This keeps track of the total number of promoted persons created. Promoted celebrity can only be created by the COO and can be set to any initial price. At the time of this writing 24 out 303 celebrities were special promo created. There is also a hard 5000 limit of promoted celebrities that can be created. Also note, that  the celebrity that are birthed normally always start out with the price of .001 Ether.

```
  uint256 public promoCreatedCount;

```


The following defines the mapping from person ID (celebrity) to the current owner of that celebrity. 

```  
  /*** DATATYPES ***/
  struct Person {
    string name;
  }
```

All the cryptocelebrities are living inside this array. The tokenId is really the index to this array. For eg., index 0 is Satoshi Nakamoto himself. You could by going to the etherscan.io read smart contract tab and see the value of the Person for index 0. If you go to [Etherscan Read Smart Contract tab](https://etherscan.io/address/0xbb5Ed1EdeB5149AF3ab43ea9c7a6963b3C1374F7#readContract) , you can enter 0 for the getPerson call and hit Query and it should show you the Person at index 0.

```
  Person[] private persons;
```

Now comes all the public methods that can be invoked.

This is a method required by the ERC721 contract. The method allows the owner of a token to transfer their cryptocelebrity to another address. This is there for the ERC721 compliance but I did not see any functionality in the site that uses this method.

```
  /*** PUBLIC FUNCTIONS ***/
  /// @notice Grant another address the right to transfer token via takeOwnership() and transferFrom().
  /// @param _to The address to be granted transfer approval. Pass address(0) to
  ///  clear all approvals.
  /// @param _tokenId The ID of the Token that can be transferred if this call succeeds.
  /// @dev Required for ERC-721 compliance.
  function approve(
    address _to,
    uint256 _tokenId
  ) public {
    // Caller must own token.
    require(_owns(msg.sender, _tokenId));

    personIndexToApproved[_tokenId] = _to;

    Approval(msg.sender, _to, _tokenId);
  }
```

The following method shows how many tokens this user has. This is something thats shown in the profile screen of a user in cryptocelebrities.io website.

```
  /// For querying balance of a particular account
  /// @param _owner The address for balance query
  /// @dev Required for ERC-721 compliance.
  function balanceOf(address _owner) public view returns (uint256 balance) {
    return ownershipTokenCount[_owner];
  }
```

This is where the magic of celebrity creation happens in the blockchain. As of this writing there are only 330 celebrities in the system. Using this method, the COO wallet can invoke the createPromoPerson call with a new owner, name and a pre-set price. This celebrity is considered promotional and can only be done PROMO_CREATION_LIMIT (5000) times.  

```
  /// @dev Creates a new promo Person with the given name, with given _price and assignes it to an address.
  function createPromoPerson(address _owner, string _name, uint256 _price) public onlyCOO {
    require(promoCreatedCount < PROMO_CREATION_LIMIT);

    address personOwner = _owner;
    if (personOwner == address(0)) {
      personOwner = cooAddress;
    }

    if (_price <= 0) {
      _price = startingPrice;
    }

    promoCreatedCount++;
    _createPerson(_name, personOwner, _price);
  }
```

Similar version to above where a COO wallet creates a new celebrity. This method uses the default starting price rather than a user set price.

```
  /// @dev Creates a new Person with the given name.
  function createContractPerson(string _name) public onlyCOO {
    _createPerson(_name, address(this), startingPrice);
  }
```

Simple method that would return the celebrity token information.

```
  /// @notice Returns all the relevant information about a specific person.
  /// @param _tokenId The tokenId of the person of interest.
  function getPerson(uint256 _tokenId) public view returns (
    string personName,
    uint256 sellingPrice,
    address owner
  ) {
    Person storage person = persons[_tokenId];
    personName = person.name;
    sellingPrice = personIndexToPrice[_tokenId];
    owner = personIndexToOwner[_tokenId];
  }
 ```
 
 More compliance functions for ETC721 
 
 ```
   function implementsERC721() public pure returns (bool) {
    return true;
  }

  /// @dev Required for ERC-721 compliance.
  function name() public pure returns (string) {
    return NAME;
  }
 ```
 
 This method returns the owner of the said celebrity
 
 ```
   /// For querying owner of token
  /// @param _tokenId The tokenID for owner inquiry
  /// @dev Required for ERC-721 compliance.
  function ownerOf(uint256 _tokenId)
    public
    view
    returns (address owner)
  {
    owner = personIndexToOwner[_tokenId];
    require(owner != address(0));
  }
  
 ```
 
 This is how as a CEO/CTO you could take the money in this smart contract and move it somewhere else. 
 
 ```
  function payout(address _to) public onlyCLevel {
    _payout(_to);
  }
 ```
 
 This is the main critical method of this smart contract. Here is where someone who is willing to send ether in exchange for the celebrity token.
 
 ```
   // Allows someone to send ether and obtain the token
  function purchase(uint256 _tokenId) public payable {
    address oldOwner = personIndexToOwner[_tokenId];
    address newOwner = msg.sender;

    uint256 sellingPrice = personIndexToPrice[_tokenId];

    // Making sure token owner is not sending to self
    require(oldOwner != newOwner);

    // Safety check to prevent against an unexpected 0x0 default.
    require(_addressNotNull(newOwner));

    // Making sure sent amount is greater than or equal to the sellingPrice
    require(msg.value >= sellingPrice);

    uint256 payment = uint256(SafeMath.div(SafeMath.mul(sellingPrice, 94), 100));
    uint256 purchaseExcess = SafeMath.sub(msg.value, sellingPrice);

    // Update prices
    if (sellingPrice < firstStepLimit) {
      // first stage
      personIndexToPrice[_tokenId] = SafeMath.div(SafeMath.mul(sellingPrice, 200), 94);
    } else if (sellingPrice < secondStepLimit) {
      // second stage
      personIndexToPrice[_tokenId] = SafeMath.div(SafeMath.mul(sellingPrice, 120), 94);
    } else {
      // third stage
      personIndexToPrice[_tokenId] = SafeMath.div(SafeMath.mul(sellingPrice, 115), 94);
    }

    _transfer(oldOwner, newOwner, _tokenId);

    // Pay previous tokenOwner if owner is not contract
    if (oldOwner != address(this)) {
      oldOwner.transfer(payment); //(1-0.06)
    }

    TokenSold(_tokenId, sellingPrice, personIndexToPrice[_tokenId], oldOwner, newOwner, persons[_tokenId].name);

    msg.sender.transfer(purchaseExcess);
  }
```

