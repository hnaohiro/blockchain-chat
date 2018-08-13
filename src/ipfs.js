import IPFS from "ipfs";

const node = new IPFS({ repo: String(Math.random() + Date.now()) });

node.once("ready", () => console.log("IPFS node is ready"));

export default node;
