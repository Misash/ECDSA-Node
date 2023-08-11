const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());


// public keys are just know by the server
const publicKeys = [
  "029369e09e44c6edfaadaf7dcb08e6952e3b3dd8950c2d41558df754e7fed45e02",
  "028a02e957770a1ebb8bc0e6c92b5b9c5120cc1e1985a46082d40f316a7cca1b7a",
  "020fc4569d1a1eacd05e7b23f5c79dd5965a9d213a53791d176a45afcd4a5c8d47"]


// to ensure a layer of privacy , just use the eth address edrivation from the public keys
const ethAddress = {
  [publicKeys[0]] : "0xf552c096a342196a91530b2da3e1764a903932d7" ,
  [publicKeys[1]] : "0x338bc08cc132083efb47aa3b1be3ac98fcad66fc" ,
  [publicKeys[2]] : "0x9bb150acc1dada906398ce8af010a0d7620eaea1" 
}


const balances = {
  [ethAddress[publicKeys[0]]]: 100,
  [ethAddress[publicKeys[1]]]: 50,
  [ethAddress[publicKeys[2]]]: 75,
};



app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
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
