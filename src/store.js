import Vue from "vue";
import Vuex from "vuex";
import contract from "./contract";
import web3 from "./web3";
import router from "./router";
import ipfs from "./ipfs";

Vue.use(Vuex);

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
    async sendText({ commit, state, dispatch }) {
      if (state.input.text) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods
          .sendText(state.input.text)
          .send({ from: accounts[0], gas: 1e6 });
        commit("setInputText", "");
        dispatch("fetchMessages");
      } else {
        alert("please input text");
      }
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

      ipfs.upload(file, function(err, url) {
        if (err) {
          alert("ipfs error: " + err);
        } else {
          commit("setInputUserAvatarUrl", url);
        }
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
