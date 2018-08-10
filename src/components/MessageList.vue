<template>
  <div>
    <div class="direct-chat-messages">
      <div class="direct-chat-msg" v-for="message of messages" v-bind:key="message.id">
        <div class="direct-chat-info clearfix">
          <span class="direct-chat-name pull-left">{{ message.owner }}</span>
          <span class="direct-chat-timestamp pull-right">{{ message.timestamp | timestamp2date }}</span>
        </div>
        <img class="direct-chat-img" src="https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg">
        <div class="direct-chat-text">{{ message.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "MessageList",
  computed: {
    ...mapGetters({
      messages: "getMessages"
    })
  },
  filters: {
    timestamp2date(value) {
      return moment.unix(value).format("LLL");
    }
  }
};
</script>

<style scoped lang="scss">
.direct-chat-messages {
  height: 100%;
}
</style>
