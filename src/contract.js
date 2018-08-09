import web3 from "./web3";
import Chat from "../build/contracts/Chat.json";

const tokenAddress = "0x3a9c898af2d01af4544c67a0c87775179230f85d";
const contract = new web3.eth.Contract(Chat.abi, tokenAddress);

export default contract;
