import MindElixir from "./mind-elixir-4.5.2.min.js";

console.log("tototo");
const mind = new MindElixir({
  el: "#map",
  // direction: MindElixir.LEFT,

  draggable: false, // default true
  contextMenu: false, // default true
  toolBar: false, // default true
  keypress: false, // default true
});

mind.init(MindElixir.new("new topic"));
