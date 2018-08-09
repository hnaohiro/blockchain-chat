<template>
  <div>
    <div class="box box-success">
      <div class="box-header with-border">
        <h3 class="box-title">Blockchain Chat</h3>
        <div class="box-tools pull-right">
          <router-link to="/config" class="btn btn-box-tool"><i class="fa fa-cog"></i>
          </router-link>
        </div>
      </div>
      <div class="box-body">
        <MessageList />
      </div>
      <div class="box-footer">
        <MessageInput />
      </div>
    </div>
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
