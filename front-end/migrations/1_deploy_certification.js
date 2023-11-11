const Certification = artifacts.require("Certification");

module.exports = async function (deployer, network, accounts) {
    const name = "Holy Angel University Blockchain Diploma";
    const symbol = "HAUBD";
  await deployer.deploy(Certification, name, symbol, accounts[0]);
};
