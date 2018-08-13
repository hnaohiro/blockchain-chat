import IPFS from "ipfs";

const node = new IPFS({ repo: String(Math.random() + Date.now()) });

node.once("ready", () => console.log("IPFS node is ready"));

export default {
  upload(file, callback) {
    const reader = new FileReader();

    reader.onload = function() {
      const bytes = new Uint8Array(reader.result);

      node.files.add(Buffer.from(bytes), (err, res) => {
        if (err) {
          alert("ipfs error: " + err);
          callback(err, null);
        } else {
          if (res[0] && res[0].hash) {
            const url = "https://ipfs.io/ipfs/" + res[0].hash;
            callback(null, url);
          }
        }
      });
    };

    reader.readAsArrayBuffer(file);
  }
}
