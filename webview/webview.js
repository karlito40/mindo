import { createMind, drawMind, exportToImage, MindLayout } from "./mindmap.js";

const mind = createMind("#map", {
  draggable: false,
  contextMenu: false,
  // toolBar: false,
  keypress: false,
});

const mindLayout = new MindLayout(mind);

document.querySelectorAll(".export-btn").forEach((exportBtn) => {
  exportBtn.addEventListener("click", ({ target }) => {
    exportToImage(mind, target.dataset.exportType);
  });
});

const messageManager = {
  draw({ dataMind }) {
    if (!dataMind) {return;}

    drawMind(mind, dataMind);
    mindLayout
      .initButtonListeners()
      .refreshAlignment();
    // if (rootNode.children.length > 3) {
    //   // initLeft, initRight, initSide
    //   mind.initSide();
    // } else {
    //   mind.initRight();
    // }
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