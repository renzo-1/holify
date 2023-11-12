// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certification is ERC721, Ownable{
  
  uint256 private tokenIdCounter;
  event MintedCert(uint256 indexed _tokenId);

  struct certificate {
    string studentName;
    string studentNum;
    string program;
    string specialization;
    string gradDate;
  }

  certificate[] public student;

  constructor(string memory name, string memory symbol, address _owner) ERC721(name, symbol) Ownable(_owner) {
  }
  
  function verify( uint256 certTokenId ) public view returns(string memory studentName, string memory studentNum, string memory program, string memory gradDate, string memory specialization) {
    certificate memory _certificate = student[certTokenId];

    studentName = _certificate.studentName;
    studentNum = _certificate.studentNum;
    program = _certificate.program;
    gradDate = _certificate.gradDate;
    specialization = _certificate.specialization;

    return (studentName, studentNum, program, specialization, gradDate);
  }

  function mint(string memory _name, string memory _studentNum, string memory _program,  string memory _specialization,  string memory _gradDate) public  payable onlyOwner {
    uint256 certTokenId = tokenIdCounter;
    certificate memory _certificate = certificate({ studentName: _name, studentNum: _studentNum, program: _program, specialization: _specialization,  gradDate: _gradDate});
    student.push(_certificate);
    _mint(msg.sender, certTokenId);
    tokenIdCounter++;
    emit MintedCert(certTokenId);
  }
}