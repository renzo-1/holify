// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certification is ERC721, Ownable{
  
  uint256 private tokenIdCounter;
  event MintedCert(uint256 indexed _tokenId);

  struct certificate {
    string name;
    string studentNum;
    string program;
    string specialization;
    string gradDate;
  }

  certificate[] public student;

  constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) Ownable(_owner) {
  }
  
  function verify( uint256 certTokenId ) public view returns(string memory name, string memory program, string memory gradDate, string memory specialization) {
    certificate memory _certificate = student[certTokenId];
    name = _certificate.name;
    program = _certificate.program;
    gradDate = _certificate.gradDate;
    specialization = _certificate.specialization;
    return (name, program, gradDate, specialization);
  }

  function mint(string memory _name,  string memory _program, string memory _studentNum, string memory _gradDate, string memory _specialization) public  payable onlyOwner    returns(uint256 tokenID) {
    uint256 certTokenId = tokenIdCounter;
    certificate memory _certificate = certificate({ name: _name, studentNum: _studentNum, program: _program, gradDate: _gradDate, specialization: _specialization});
    student.push(_certificate);
    _mint(msg.sender, certTokenId);
    tokenIdCounter++;
    emit MintedCert(certTokenId);
    return certTokenId;
  }
}