const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")


function getAddress(publicKey) {
    //take the last 20 bytes 
    let publicKeyHash = keccak256(publicKey);
    let ethAddress = publicKeyHash.slice(-20);
    return  "0x" + toHex(ethAddress);
}

//genarate private key
const privateKey = secp.secp256k1.utils.randomPrivateKey();
//get the public key
const publicKey = secp.secp256k1.getPublicKey(privateKey)
//get the eth derivation address
const ethAddress = getAddress(publicKey)

console.log("privateKey:\t", toHex(privateKey));
console.log("publicKey:\t", toHex(publicKey));
console.log("EthPublickKey:\t", ethAddress);


//sing a transaction
const message = "data to be signed"
const messageHash = keccak256(Buffer.from(message))
const signature = secp.secp256k1.sign(messageHash,privateKey);

console.log("signature: ", signature)


if(secp.secp256k1.verify(signature,messageHash,publicKey)){
    console.log("valid signature :)")
}else{
    console.log("invalid signature :C")
}

// privateKey:      1fb26f8ba4dc726f0ed82ef4cc118b1b5332b02fca58311ce4c536bbe1d87bf1
// publicKey:       029369e09e44c6edfaadaf7dcb08e6952e3b3dd8950c2d41558df754e7fed45e02
// EthPublickKey:   0xf552c096a342196a91530b2da3e1764a903932d7



// privateKey:      d6b2d07450975fd62179253d81f68107a3bcd340be5aa669ae829c2e3af09a2d
// publicKey:       028a02e957770a1ebb8bc0e6c92b5b9c5120cc1e1985a46082d40f316a7cca1b7a
// EthPublickKey:   0x338bc08cc132083efb47aa3b1be3ac98fcad66fc



// privateKey:      eee314ea6618af350cf9c5ea569a8fed765e6221a3d33c89843b66d080384f83
// publicKey:       020fc4569d1a1eacd05e7b23f5c79dd5965a9d213a53791d176a45afcd4a5c8d47
// EthPublickKey:   0x9bb150acc1dada906398ce8af010a0d7620eaea1