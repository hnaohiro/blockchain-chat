<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">Config</h3>
    </div>
    <div class="box-body">
      <div class="form-group">
        <label for="user-name">Name</label>
        <input type="text" class="form-control" id="user-name" :value="user.name" @input="updateInputUserName">
      </div>

      <div class="form-group">
        <label>Avatar</label>

        <div class="input-group">
          <input type="text" class="form-control">
          <label class="input-group-btn">
            <span class="btn btn-default">
              Choose File
              <input type="file" class="form-control" style="display:none" @change="selectFile">
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <div class="clearfix">
        <div class="pull-right">
          <router-link to="/" class="btn btn-default">Back</router-link>
          <button class="btn btn-success btn-save" v-on:click="saveUser">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import IPFS from "ipfs";
const node = new IPFS({ repo: String(Math.random() + Date.now()) });
node.once("ready", () => console.log("IPFS node is ready"));

export default {
  name: "config",
  data() {
    return {
      uploadFile: null
    };
  },
  methods: {
    ...mapActions(["updateInputUserName", "saveUser"]),
    selectFile(e) {
      e.preventDefault();
      const files = e.target.files;
      const file = files[0];

      const reader = new FileReader();

      reader.onload = function() {
        const bytes = new Uint8Array(reader.result);
        console.log(bytes);

        node.files.add(Buffer.from(bytes), (err, res) => {
          if (err || !res) {
            return console.error("ipfs add error", err, res);
          }

          res.forEach(function(file) {
            if (file && file.hash) {
              console.log("successfully stored", file.hash);
            }
          });
        });
      };

      reader.readAsArrayBuffer(file);
    }
  },
  computed: {
    ...mapGetters({
      user: "getInputUser"
    })
  },
  mounted() {
    this.$store.dispatch("fetchCurrentUser");
  }
};
</script>

<style scoped lang="scss">
.btn-save {
  margin-left: 10px;
}
</style>
