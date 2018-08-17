import Vue from "vue";
import Vuex from "vuex";
import contract from "./contract";
import web3 from "./web3";
import router from "./router";
import ipfs from "./ipfs";
import "./event";
import VueChatScroll from "vue-chat-scroll";

Vue.use(Vuex);
Vue.use(VueChatScroll);

export default new Vuex.Store({
  state: {
    messages: [],
    input: {
      text: "",
      user: {
        name: "",
        avatarUrl: ""
      }
    }
  },
  mutations: {
    setMessages(state, value) {
      state.messages = value;
    },
    setInputText(state, value) {
      state.input.text = value;
    },
    setInputUserName(state, value) {
      state.input.user.name = value;
    },
    setInputUserAvatarUrl(state, value) {
      state.input.user.avatarUrl = value;
    }
  },
  actions: {
    async fetchMessages({ commit }) {
      const length = Number(await contract.methods.getLength().call());
      let messages = new Array(length);
      for (let i = 0; i < length; i++) {
        let message = await contract.methods.getMessage(i).call();
        message.user = await contract.methods.getUser(message.owner).call();
        messages[i] = message;
      }
      commit("setMessages", messages);
    },
    async fetchCurrentUser({ commit }) {
      const accounts = await web3.eth.getAccounts();
      const user = await contract.methods.getUser(accounts[0]).call();
      commit("setInputUserName", user.name);
      commit("setInputUserAvatarUrl", user.avatarUrl);
    },
    async updateInputText({ commit }, event) {
      commit("setInputText", event.target.value);
    },
    async updateInputUserName({ commit }, event) {
      commit("setInputUserName", event.target.value);
    },
    async updateInputUserAvatarUrl({ commit }, event) {
      commit("setInputUserAvatarUrl", event.target.value);
    },
    async sendText({ commit, state }) {
      if (state.input.text) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods
          .sendText(state.input.text)
          .send({ from: accounts[0], gas: 1e6 });
        commit("setInputText", "");
      } else {
        alert("please input text");
      }
    },
    async sendImage({ dispatch }, event) {
      event.preventDefault();
      const file = event.target.files[0];

      ipfs
        .upload(file)
        .then(async url => {
          const accounts = await web3.eth.getAccounts();
          await contract.methods
            .sendImage(url)
            .send({ from: accounts[0], gas: 1e6 });
          dispatch("fetchMessages");
        })
        .catch(err => {
          alert("ipfs error: " + err);
        });
    },
    async saveUser({ state }) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .setUser(state.input.user.name, state.input.user.avatarUrl)
        .send({ from: accounts[0], gas: 1e6 });
      router.push("/");
    },
    uploadAvatarImage({ commit }, event) {
      event.preventDefault();
      const file = event.target.files[0];

      ipfs
        .upload(file)
        .then(url => {
          commit("setInputUserAvatarUrl", url);
        })
        .catch(err => {
          alert("ipfs error: " + err);
        });
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getInputText(state) {
      return state.input.text;
    },
    getInputUser(state) {
      return state.input.user;
    }
  }
});
