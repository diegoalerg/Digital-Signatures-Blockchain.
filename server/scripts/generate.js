
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
//const { publicKeyConvert } = require('secp256k1');

//Create a 3 random private key, public key and address to use them in the project.

for (let i = 0; i < 3; i++) {

    privateKey = secp.secp256k1.utils.randomPrivateKey()
    console.log('private Key', (privateKey))
    console.log('HEX private Key', toHex(privateKey))

    publicKey=  keccak256(secp.secp256k1.getPublicKey(privateKey).slice(1)).slice(-20);
    console.log('public Key', toHex(publicKey))
    
    firstBite = publicKey.slice(0)
    address = `0x${toHex(publicKey)}`;
    console.log('address', address)

    let message = 'project01'
    let bytes = utf8ToBytes(message);

    // hash the message using keccak256
    let messageHash = keccak256(bytes);

    //Create a signature using the private key and the hashed message
    let signature = secp.secp256k1.sign(messageHash, privateKey)
    console.log('signature', signature)

    //Get the string format SERVER
    let StringSignature = signature.toCompactHex()
    console.log('string', StringSignature)

    //Verification
    let userSignature = secp.secp256k1.Signature.fromCompact(StringSignature);
    console.log('userSignature', userSignature)

    //let signatureForRecovery = new secp.secp256k1.Signature(userSignature.r.valueOf(), userSignature.s.valueOf(), 1);
    //console.log('signatureForRecovery', signatureForRecovery)

      //Get the string format USER
    let StringSignatureUser = userSignature.toCompactHex()
    console.log('stringSignatureUser', StringSignatureUser)

    // let signature2 = '4342f973abd6552fd6910a2136a07e48376259bc18b47d2ac2b37e1ee05c4b071a9caee36d2cd3ccf600ba2b692e33dc2ba2b5323a3b59629165476e7bcec66c'
    // let publicKeyR = secp.secp256k1.recoverPublicKey(messageHash, signature2, 1, false)

    // console.log('publicKeyR:', publicKeyR)
}

// const message = 'project01'
// const bytes = utf8ToBytes(message);

// // hash the message using keccak256
// const messageHash = keccak256(bytes);

// //Create a signature using the private key and the hashed message
// //const signature = secp.secp256k1.sign(messageHash, privateKey)
// const signature = secp.secp256k1.sign(messageHash, privateKey)
// console.log('signature', signature)

// //Get the string format

// const StringSignature = signature.toCompactHex()
// console.log('string', StringSignature)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4//This will appear after user input the Signature
// const userSignature = secp.secp256k1.Signature.fromCompact(StringSignature);
// console.log('userSignature', userSignature)

// const signatureForRecovery = new secp.secp256k1.Signature(userSignature.r.valueOf(), userSignature.s.valueOf(), 1);
// console.log('signatureForRecovery', signatureForRecovery)

// const recoverPublicKey = signature.recoverPublicKey(messageHash);
// console.log('recoverPublicKey', recoverPublicKey)

// const publicKey2 = signature.recoverPublicKey(messageHash, signature, signature.recovery, false)

// console.log('publicKey2:', publicKey2)

// // Combine px, py into a buffer
// const publicKeyBuffer = Buffer.concat([
//     Buffer.from(recoverPublicKey.px.toString(16), 'hex'),
//     Buffer.from(recoverPublicKey.py.toString(16), 'hex')
//   ]);
  
//   // Compressed public key
//   const compressedPublicKey = secp.publicKeyConvert(publicKeyBuffer, true);
  
//   // Hexadecimal representation
//   const publicKeyHex = compressedPublicKey.toString('hex');
//   console.log(publicKeyHex);
