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
          <input type="text" class="form-control" :value="user.avatarUrl" @input="updateInputUserAvatarUrl" title="avatar-url">
          <label class="input-group-btn">
            <span class="btn btn-default">
              Choose File
              <input type="file" class="form-control" accept="image/*" style="display:none" @change="uploadAvatarImage">
            </span>
          </label>
        </div>
      </div>

      <div class="form-group" v-if="user.avatarUrl">
        <label>Avatar Preview</label>
        <div>
          <img :src="user.avatarUrl" class="avatar-preview" />
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

<style>
.avatar-preview {
  width: 128px;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "config",
  data() {
    return {
      uploadFile: null
    };
  },
  methods: {
    ...mapActions([
      "updateInputUserName",
      "updateInputUserAvatarUrl",
      "uploadAvatarImage",
      "saveUser"
    ])
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
