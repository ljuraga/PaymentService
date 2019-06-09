pragma solidity ^0.5.9;
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract paymentService{

    address payable private owner = msg.sender;

    address[] private customers;
    mapping (address => uint256) private customersIndexes;

    uint256 private ownerRatio = 49;
    uint256 private customerRatio = 51;


    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }
    
    function transferContractBalanceToOwner(uint amount) public onlyOwner returns(bool)  {
        if (amount <= getContractBalance()){
            owner.transfer(amount);
            return true;
        }else{
            return false;
        }
    }

    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function closeContract() public onlyOwner {
        selfdestruct(owner);
    }

    function addCustomerAddress(address customerAddress) onlyOwner public {
        uint id = customers.length;
        customersIndexes[customerAddress] = id;
        customers.push(customerAddress);
    }

    function removeCustomerAddress(address customerAddress) onlyOwner public {
        uint id = customersIndexes[customerAddress];
        delete customers[id];
    }

    function getCustomerCount() onlyOwner public view returns(uint count) {
        return customers.length;
    }

    event LogCustomers(address customer);

    function getCustomers() onlyOwner public {
        for (uint i=0; i<customers.length; i++) {
            emit LogCustomers(customers[i]);
        }
    }

    function getOwnerRatio() onlyOwner public view returns(uint256) {
        return ownerRatio;
    }

    function getCustomerRatio() onlyOwner public view returns(uint256) {
        return customerRatio;
    }

    function setOwnerRatio(uint256 newOwnerRatio) onlyOwner public {
        ownerRatio = newOwnerRatio;
    }

    function setCustomerRatio(uint256 newCustomerRatio) onlyOwner public {
        customerRatio = newCustomerRatio;
    }

    function processPayment(address payable customerAddress, uint256 amount) payable public {
        require(msg.value == amount);

        bool found=false;
        for (uint i=0; i<customers.length; i++) {
            if(customers[i]==customerAddress){
                found=true;
                customerAddress.transfer(SafeMath.div(SafeMath.mul(amount, customerRatio), 100));
                owner.transfer(SafeMath.div(SafeMath.mul(amount, ownerRatio), 100));
                break;
            }
        }
        
        if(!found){
            revert();
        }
    }
}
