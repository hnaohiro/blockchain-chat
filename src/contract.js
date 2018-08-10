import web3 from "./web3";
import Chat from "../build/contracts/Chat.json";

const networkId = 5777;
const address = Chat.networks[networkId].address;
const contract = new web3.eth.Contract(Chat.abi, address);

export default contract;
