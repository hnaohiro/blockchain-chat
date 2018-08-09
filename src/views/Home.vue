<template>
  <div>
    <MessageList />
    <MessageInput />
  </div>
</template>

<script>
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";

export default {
  name: "home",
  components: {
    MessageList,
    MessageInput
  },
  mounted() {
    this.$store.dispatch("fetchMessages");
  }
};
</script>
