import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1'
import * as toHex from 'ethereum-cryptography/utils'
import {utf8ToBytes} from 'ethereum-cryptography/utils'
import {keccak256} from 'ethereum-cryptography/keccak'




function Wallet({ address, setAddress, balance, setBalance, signature, setSignature }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    console.log('userSignature', signature)
    setSignature(signature);

    //Logic to get the signature, compare with the ones generated using the private keys of the users and if it matches, show the respective funds


    const message = 'project01'
    const bytes = utf8ToBytes(message);
    const messageHash = keccak256(bytes);

    

    //7f9505d49135f4b1b8993648ba9e391b1282a62ca0d5a723cef1808c1e0baed6

   
    // Make a function here function getStringSignature(hexString) {****************************************************

//*********** */

function getStringSignature(hexString) {
  const buffer = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const uint8Array = new Uint8Array(buffer);

  // Ensure the length is 32 (add padding if needed)
  let finalArray;
  if (uint8Array.length < 32) {
    const paddedUint8Array = new Uint8Array(32);
    paddedUint8Array.set(uint8Array, 32 - uint8Array.length);
    finalArray = paddedUint8Array;
  } else {
    finalArray = uint8Array.slice(0, 32); // If the length is more than 32, consider slicing it to 32 bytes
  }

  // Mocking the missing 'secp' object and 'messageHash'
  const possibleSignature = secp.secp256k1.sign(messageHash, hexString);
  const StringSignature = possibleSignature.toCompactHex();

  return StringSignature;
}
/*
    // Convert hex string to array buffer
    const buffer = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));


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
 
    //Taking each array and creating a sign
    const possibleSignature = secp.secp256k1.sign(messageHash, hexString)
    console.log('possibleSignature', possibleSignature)

    //Get the string format SERVER
    const StringSignature = possibleSignature.toCompactHex()
    console.log('string', StringSignature)
  */
    //****************************************************
    //VERIFICATION HAVING EACH STRING SIGNATURE WITH THE ONE FROM THE USER
    const hexString1 = '7f9505d49135f4b1b8993648ba9e391b1282a62ca0d5a723cef1808c1e0baed6';
    const hexString2 = '810cffb6b9c5831bad029ee82b7937013aea3764141909f5140dbb8a0ce3a5ca';
    const hexString3 = '13db36ae8fc69fb34edf56779487a4a5b4a1fe1e75c6a4304ee4de4c49fc7801';

    let StringSignature1 = getStringSignature(hexString1);
    let StringSignature2 = getStringSignature(hexString2);
    let StringSignature3 = getStringSignature(hexString3);

    console.log('StringSignature1:', StringSignature1);
    console.log('StringSignature2:', StringSignature2);
    console.log('StringSignature3:', StringSignature3);

     //Taking each Hex private key and make it array.


    ///2 Conditions to compare the 'signature' (string) with the ones generate usings the user private keys. Once match set to respective address
    console.log('address before condition',signature)
    if (signature == StringSignature1) {
      console.log('matched1, assigned address according private key')
      address = '0x0fe3b58d7c3901188fb69848841a58b03dbd13c1'
      setAddress(address)

    } else if (signature == StringSignature2) {
      console.log('matched2, assigned address according private key')
      address = '0x8ef90c6a87d90da61998963ad7606851b39d5273'
      setAddress(address)
      
    } else if (signature == StringSignature3) {
      console.log('matched, assigned address according private key')
      address = '0x2f51f130afed415fadc24662475fc0f15b857b6b'
      setAddress(address)
    } else {
      console.log('there is no match')
    }
    console.log('address before balance', address)

    if (address) {
      console.log('address', address)
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log('balance', balance)
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

// Nothing to do with the project. This is the way how usually web3 application ask to sign a message. signature LINE 13
  // async function setSignature() {
  //   try {
  //     // Get the Ethereum provider
  //     const provider = window.ethereum;

  //     // Check if the provider is available
  //     if (provider) {
  //       // Request account access
  //       const accounts = await provider.request({ method: 'eth_requestAccounts' });

  //       // Get the selected account
  //       const account = accounts[0];

  //       // Your message to be signed
  //       const message = 'Hello, sign me!';

  //       // Sign the message
  //       const signature = await provider.request({
  //         method: 'personal_sign',
  //         params: [message, account],
  //       });

  //       // Handle the signature (you can send it to the server, etc.)
  //       console.log('Signature:', signature);
  //     } else {
  //       console.error('Web3 provider not found. Please install MetaMask or another Ethereum wallet.');
  //     }
  //   } catch (error) {
  //     console.error('Error signing message:', error);
  //   }
  // }

  return (
    <div className="container wallet">
      <h1>Your Wallet Signature</h1>

      <label>
        Signature (string format)
        <input placeholder="Place your signature..." value={signature} onChange={onChange}></input>
      </label>

      <div>Signature string format: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
