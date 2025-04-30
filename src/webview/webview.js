import { createMind, drawMind } from "./mindmap.js";

const mind = createMind("#map", {
  draggable: false,
  // contextMenu: false,
  // toolBar: false,
  keypress: false,
});

const messageManager = {
  draw({ dataMind }) {
    dataMind && drawMind(mind, dataMind);
  },
  // draw({ text }) {
  //   console.log("=> execute draw", { text });
  //   const dataMind = resolveText(text);
  //   dataMind && drawMind(mind, dataMind);
  // },
};

window.addEventListener("message", (event) => {
  console.log("mindo message received:", event);
  const message = event.data; // The JSON data our extension sent
  if (messageManager[message.command]) {
    messageManager[message.command](message);
  } else {
    console.error(`Oops command ${message.command} not found`);
  }
});
