import Web3Eth from "web3-eth";
import { contractABI } from "./abi";
import Contract from "web3-eth-contract";
const contractAddress = "0x57354D9309e6268133Ae53F2b21700352Ddceb6D";
const contractProvider = "HTTP://127.0.0.1:8545";

export const getHolifyAccAdd = async () => {
  const holifyMetamaskAcc = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return holifyMetamaskAcc[0];
};

export const connect2Metamask = async () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.web3 = new Web3Eth(contractProvider);
    const acc = await getHolifyAccAdd();
    return acc;
  } else {
    alert("Please install MetaMask on your browser :D");
  }
};

export const getContract = async () => {
  let contract = new Contract(contractABI, contractAddress);
  contract.setProvider(contractProvider);
  return contract;
};
// const printCurrentOwner = useCallback(async () => {
//   const holifyMetamaskAcc = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   console.log("holifyMetamaskAcc", holifyMetamaskAcc[0]);
//   const addr = await getCurrentOwner();
//   console.log("owner", addr);
// }, []);
