import Web3 from "web3";

let web3;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // let provider = new Web3.providers.HttpProvider("http://localhost:8545");
  let provider = new Web3.providers.WebsocketProvider("ws://localhost:8545");
  web3 = new Web3(provider);
}

export default web3;
