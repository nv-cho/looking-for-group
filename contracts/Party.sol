// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract Party is AccessControlEnumerable {
    struct Member {
        address memberAddress;
        uint8 percentage;
    }

    event MoneySent(address sender, uint256 moneySent);

    string public partyName;

    bytes32 public constant PARTY_MEMBER = keccak256("PARTY_MEMBER");

    Member[] public partyMembers;

    constructor (string memory _partyName, Member[] memory  _partyMembers) public {
        uint8 totalPercentages;
        for (uint256 i = 0; i < _partyMembers.length; i++) {
            totalPercentages = totalPercentages + _partyMembers[i].percentage;
        }
        require(
            totalPercentages == 100,
            "The sum of the percentages should equal 100"
        );

        for (uint256 i = 0; i < _partyMembers.length; i++) {
            _grantRole(PARTY_MEMBER, _partyMembers[i].memberAddress);

            partyMembers.push(_partyMembers[i]);
        }
        partyName = _partyName;
    }

    receive() external payable {
        // (bool sent, bytes memory data) = payable(member).call{value: msg.value}("");
        // require(sent, "Failed to send Ether to the winners");

        for (uint256 i = 0; i < partyMembers.length; i++) {
            uint256 memberTreasure = (msg.value * partyMembers[i].percentage) /
                100;
            payable(partyMembers[i].memberAddress).transfer(memberTreasure);
        }

        emit MoneySent(msg.sender, msg.value);
    }

    function setPartyName(string memory _partyName)
        public
        onlyRole(PARTY_MEMBER)
    {
        partyName = _partyName;
    }

    function leaveParty() public onlyRole(PARTY_MEMBER){
        uint8 index;

        for(uint8 i = 0; i < partyMembers.length; i++) {
            if(msg.sender == partyMembers[i].memberAddress) {
                index = i;
            }
        }

        partyMembers[index] = partyMembers[partyMembers.length - 1];

        partyMembers.pop();
        renounceRole(PARTY_MEMBER, msg.sender);
    }

    function getPartyName() public view returns (string memory) {
        return partyName;
    }

    function getPartySize() public view returns (uint256) {
        return partyMembers.length;
    }

    function getPartyMembers() public view returns (address[] memory) {
        address[] memory members = new address[](partyMembers.length);
        for (uint256 i = 0; i < partyMembers.length; i++) {
            members[i] = partyMembers[i].memberAddress;
        }
        return members;
    }

    function getPartyDistribution() public view returns (Member[] memory) {
        return partyMembers;
    }

    function isPartyMember(address _address) public view returns (bool) {
        return hasRole(PARTY_MEMBER, _address);
    }
}