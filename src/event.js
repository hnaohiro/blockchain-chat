import contract from "./contract";
import vuex from "./store";

const event = contract.events.MessageAppended();

event.on("data", data => {
  vuex.dispatch("fetchMessages");
  console.log("data", data);
});
event.on("changed", data => console.log("changed", data));
event.on("error", error => console.log("error", error));
