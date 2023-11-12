/// <reference types="vite/client" />
interface Window {
  ethereum: any;
  web3: any;
}
// import { Dispatch, SetStateAction } from "react";

interface Web3Context {
  // contract: any;
  holifyAccount?: string;
  setHolifyAccount: Dispatch<SetStateAction<string>>;
}
interface Row {
  president?: string;
  dean?: string;
  school?: string;
  studentName: string;
  studentNum: string;
  program: string;
  specialization?: string;
  gradDate: string;
}
interface Student {
  studentName: string;
  studentNum: string;
  program: string;
  specialization?: string;
  gradDate: string;
}
interface School {
  president: string;
  dean: string;
  school: string;
}

interface Certificate extends School, Student{
  tokenId: string;
}