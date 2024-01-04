const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

//These will be the signatures that the client side needs to match.

const balances = { 
  "0x0fe3b58d7c3901188fb69848841a58b03dbd13c1": 100, // private key 7f9505d49135f4b1b8993648ba9e391b1282a62ca0d5a723cef1808c1e0baed6// string signature is d11ae1f3f733674604ed490271a162a692e0cbfd6644842e0d7520dee36b4a645afb27d66f23831b9c9d120d4eb45577f0cf44fb9d8bf53f907b676fe2c000df

  "0x8ef90c6a87d90da61998963ad7606851b39d5273": 50,  // private key 810cffb6b9c5831bad029ee82b7937013aea3764141909f5140dbb8a0ce3a5ca// string signature is c8d57b0953f661f1c1598c5f48f1d19325ccc0c13126ea522ac3b28913e2d4402111f862689a21eb60516e725b0ddf5340a8830aaf0921a6fa0269b650f41800

  "0x2f51f130afed415fadc24662475fc0f15b857b6b": 75,   //  private key 13db36ae8fc69fb34edf56779487a4a5b4a1fe1e75c6a4304ee4de4c49fc7801// string signature is ae164cc78152e7632928a8a58905a8f7559a1fa48fdbf363d15765a9164d76277b8774c6c03a0679d2f83b11c1e59808d11466e3da33e642ca0c1ee0da775f7b
  
};

//Get balances as soon as the user place an address in the client side.
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

//Function to send the funds:

app.post("/send", (req, res) => {
  //TO DO: Get the signature from the web application
  // Get the public address from the signature in order to get the sender

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
