import { createMind, drawMind, exportToImage, MapDirection } from "./mindmap.js";

const mind = createMind("#map", {
  draggable: false,
  contextMenu: false,
  // toolBar: false,
  keypress: false,
});



const mapAlignment = {
  isInitialized: false,

  handle (direction) {
    if (!this.isInitialized) {
      // SIDE BUTON
      document.querySelector('#tblts').addEventListener('click', () => {
        this.alignCenter();
      });
      // RIGHT BUTON
      document.querySelector('#tbltr').addEventListener('click', () => {
        this.alignLeft();
      });
      this.isInitialized = true;
    }

    if (direction === MapDirection.RIGHT) {
      this.alignLeft();
    } else if(direction === MapDirection.SIDE) {
      this.alignCenter();
    }
  },

  alignLeft() {
    const mindmap = document.querySelector(".main-node-container");
    const rootNode = document.querySelector("me-root");
    if (mindmap && rootNode) {
      const rootRect = rootNode.getBoundingClientRect();
      const leftPadding = 60;
      const offsetX = window.innerWidth / 2 - rootRect.width / 2 - leftPadding;
      mindmap.style.transform = `translateX(-${offsetX}px)`;
    }
  },

  alignCenter() {
    const mindmap = document.querySelector(".main-node-container");
    if (mindmap) {
      mindmap.style.transform = `translateX(0px)`;
    }
  }
};



document.querySelectorAll(".export-btn").forEach((exportBtn) => {
  exportBtn.addEventListener("click", ({ target }) => {
    exportToImage(mind, target.dataset.exportType);
  });
});

const messageManager = {
  draw({ dataMind }) {
    if (!dataMind) {return;}

    drawMind(mind, dataMind);
    // if (rootNode.children.length > 3) {
    //   // initLeft, initRight, initSide
    //   mind.initSide();
    // } else {
    //   mind.initRight();
    // }
    mapAlignment.handle(mind.direction);
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