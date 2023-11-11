export const getHolifyAccAdd = async () => {
  const holifyMetamaskAcc = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return holifyMetamaskAcc[0];
};
