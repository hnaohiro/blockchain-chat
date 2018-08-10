import Vue from "vue";
import Vuex from "vuex";
import contract from "./contract";
import web3 from "./web3";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    input: {
      text: ""
    }
  },
  mutations: {
    setMessages(state, value) {
      state.messages = value;
    },
    setText(state, value) {
      state.input.text = value;
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
    async updateInputText({ commit }, event) {
      commit("setText", event.target.value);
    },
    async sendText({ commit, state, dispatch }) {
      if (state.input.text) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.sendText(state.input.text).send({from: accounts[0], gas: 1e6});
        commit("setText", "");
        dispatch("fetchMessages");
      } else {
        alert("please input text");
      }
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getInputText(state) {
      return state.input.text;
    }
  }
});
