import { createMind, drawMind } from "./mindmap.js";

const mind = createMind("#map", {
  draggable: false,
  contextMenu: false,
  // toolBar: false,
  keypress: false,
});

const messageManager = {
  draw({ dataMind }) {
    dataMind && drawMind(mind, dataMind);
    // TODO: alignment should follow the mindmap direction
    forceLeftAlignment();
  },
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

function forceLeftAlignment() {
  const mindmap = document.querySelector(".main-node-container");
  const rootNode = document.querySelector("me-root");
  if (mindmap && rootNode) {
    const rootRect = rootNode.getBoundingClientRect();
    const leftPadding = 60;
    const offsetX = window.innerWidth / 2 - rootRect.width / 2 - leftPadding;
    mindmap.style.transform = `translateX(-${offsetX}px)`;
  }
}
