<template>
  <div>
    <div class="direct-chat-messages">
      <div class="direct-chat-msg" v-for="message of messages" v-bind:key="message.id">
        <div class="direct-chat-info clearfix">
          <span class="direct-chat-name pull-left">
            <span class="user-name">{{ message.user.name | userName }}</span>
            <span class="user-address">[{{ message.owner }}]</span>
          </span>
          <span class="direct-chat-timestamp pull-right">{{ message.timestamp | timestamp2date }}</span>
        </div>
        <img class="direct-chat-img" :src="message.user.avatarUrl | userAvatar">
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
    },
    userName(value) {
      return value ? value : "NO NAME";
    },
    userAvatar(value) {
      return value ? value : require("../assets/no-name.png");
    }
  }
};
</script>

<style scoped lang="scss">
.direct-chat-messages {
  height: 100%;
}
.user-name {
  color: #555;
}
.user-address {
  color: #999;
  margin-left: 5px;
}
</style>
