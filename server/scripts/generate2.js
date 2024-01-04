
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

//
const message = 'project01'
const bytes = utf8ToBytes(message);
const messageHash = keccak256(bytes);

//
//const privateKey 

const hexString = '68f8f2a0fea2f8d9d8cce7fe95d8f4a92c45329fd4889186a7008684891e2815'; // Replace 'yourHexStringHere' with your actual hexadecimal string

// Convert the hexadecimal string to a buffer
const buffer = Buffer.from(hexString, 'hex');

// Create a Uint8Array from the buffer
const uint8Array = new Uint8Array(buffer);

// Ensure the length is 32 (add padding if needed)
if (uint8Array.length < 32) {
  const paddedUint8Array = new Uint8Array(32);
  paddedUint8Array.set(uint8Array, 32 - uint8Array.length);
  console.log(paddedUint8Array);
} else {
  console.log(uint8Array.slice(0, 32)); // If the length is more than 32, consider slicing it to 32 bytes

}

//HEX private key to an array that can be used to generate a public key
//const publicKey=  keccak256(secp.secp256k1.getPublicKey(uint8Array).slice(1)).slice(-20);
//console.log('public Key', toHex(publicKey))
//
const signature = secp.secp256k1.sign(messageHash, hexString)
console.log('signature', signature)

