<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>owner</th>
          <th>message</th>
          <th>timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="message of messages" v-bind:key="message.timestamp">
          <td>{{ message.owner }}</td>
          <td>{{ message.text }}</td>
          <td>{{ message.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageList",
  // props: ["messages"],
  computed: {
    ...mapGetters({
      messages: "getMessages"
    })
  }
};
</script>

<style scoped lang="scss">
</style>
