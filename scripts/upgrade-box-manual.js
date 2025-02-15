const { ethers } = require("hardhat")


async function main(){

const proxyAdmin = await ethers.getContract("BoxProxyAdmin")
const transparentProxy = await ethers.getContract("Box_Proxy")

const proxyBoxV1 = await ethers.getContractAt("Box",transparentProxy.address)
const version1 = await proxyBoxV1.version()
console.log("This is the version of box BEFORE upgrade : ", version1)

const boxV2 = await ethers.getContract("BoxV2")
const upgradeTx = await proxyAdmin.upgrade(transparentProxy.address, boxV2.address)
await upgradeTx.wait(1)
const proxyBoxV2 = await ethers.getContractAt("BoxV2",transparentProxy.address)
const version2 = await proxyBoxV2.version()
console.log("This is the version of box AFTER upgrade : ", version2)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })