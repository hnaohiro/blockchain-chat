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

const MessageInput = {
  state: {
    text: ""
  },
  mutations: {
    setInputText(state, value) {
      state.text = value;
    }
  },
  actions: {
    async sendText({ commit, state }) {
      if (state.text) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods
          .sendText(state.text)
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
    async updateInputText({ commit }, event) {
      commit("setInputText", event.target.value);
    }
  },
  getters: {
    getInputText(state) {
      return state.text;
    }
  }
};

const MessageList = {
  state: {
    messages: []
  },
  mutations: {
    setMessages(state, value) {
      state.messages = value;
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
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    }
  }
};

const Config = {
  state: {
    user: {
      name: "",
      avatarUrl: ""
    }
  },
  mutations: {
    setInputUserName(state, value) {
      state.user.name = value;
    },
    setInputUserAvatarUrl(state, value) {
      state.user.avatarUrl = value;
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      const accounts = await web3.eth.getAccounts();
      const user = await contract.methods.getUser(accounts[0]).call();
      commit("setInputUserName", user.name);
      commit("setInputUserAvatarUrl", user.avatarUrl);
    },
    async updateInputUserName({ commit }, event) {
      commit("setInputUserName", event.target.value);
    },
    async updateInputUserAvatarUrl({ commit }, event) {
      commit("setInputUserAvatarUrl", event.target.value);
    },
    async saveUser({ state }) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .setUser(state.user.name, state.user.avatarUrl)
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
    getInputUser(state) {
      return state.user;
    }
  }
};

export default new Vuex.Store({
  modules: {
    MessageInput,
    MessageList,
    Config
  }
});
