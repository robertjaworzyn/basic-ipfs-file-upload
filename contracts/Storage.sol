pragma solidity ^0.4.2;

contract Storage {
    string storedData;

    function set(string x) {
        storedData = x;
    }

    function get() constant returns (string x) {
        return storedData;
    }

}
