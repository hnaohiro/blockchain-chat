<template>
  <div class="input-group">
    <label class="input-group-btn">
      <span class="btn btn-default">
        <i class="fa fa-plus"></i>
        <input type="file" class="form-control" accept="image/*" style="display:none" @change="sendImage">
      </span>
    </label>
    <input type="text" :value="text"  @input="updateInputText" @keyup.enter="sendText" class="form-control" />
    <span class="input-group-btn">
      <button v-on:click="sendText" class="btn btn-success">Send</button>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MessageInput",
  methods: {
    ...mapActions(["updateInputText", "sendText", "sendImage"])
  },
  computed: {
    ...mapGetters({
      text: "getInputText"
    })
  }
};
</script>
