<template>
  <div class="input-group">
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
    ...mapActions(["updateInputText", "sendText"])
  },
  computed: {
    ...mapGetters({
      text: "getInputText"
    })
  }
};
</script>
