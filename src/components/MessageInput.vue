<template>
  <div>
    <input type="text" :value="text"  @input="updateInputText" @keyup.enter="sendText" />
    <button v-on:click="sendText">send</button>
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
