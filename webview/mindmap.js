import MindElixir from "./mind-elixir-4.5.2.min.js";

export const MapDirection = {
  LEFT: MindElixir.LEFT,
  RIGHT: MindElixir.RIGHT,
  SIDE: MindElixir.SIDE,
};

export class MindLayout {
  constructor(mind) {
    this.mind = mind;
    this.hasButtonListeners = false;
  }

  initButtonListeners() {
    if (this.hasButtonListeners) {
      return this;
    }
    
    // SIDE BUTON
    document.querySelector('#tblts').addEventListener('click', () => {
      this.alignCenter();
    });
    // RIGHT BUTON
    document.querySelector('#tbltr').addEventListener('click', () => {
      this.alignLeft();
    });

    this.hasButtonListeners = true;
    return this;
  }

  refreshAlignment() {
    return this.changeAlignment(this.mind.direction);
  }

  changeAlignment(direction) {
    if (direction === MapDirection.RIGHT) {
      this.alignLeft();
    } else if(direction === MapDirection.SIDE) {
      this.alignCenter();
    }
    return this;
  }

  alignLeft() {
    const mindmap = document.querySelector(".main-node-container");
    const rootNode = document.querySelector("me-root");
    if (mindmap && rootNode) {
      const rootRect = rootNode.getBoundingClientRect();
      const leftPadding = 60;
      const offsetX = window.innerWidth / 2 - rootRect.width / 2 - leftPadding;
      mindmap.style.transform = `translateX(-${offsetX}px)`;
    }

    return this;
  }

  alignCenter() {
    const mindmap = document.querySelector(".main-node-container");
    if (mindmap) {
      mindmap.style.transform = `translateX(0px)`;
    }
    return this;
  }
} 

export function createMind(querySelector, options) {
  // we want to force dark_theme as we dont have time
  // to focus on light task color
  const mind = new MindElixir({
    el: querySelector,
    // MindElixir.THEME for light theme
    // or remove for system preference
    // TODO: the favorite scenario should be to use
    // the user vscode theme preference (light or dark)
    theme: MindElixir.DARK_THEME,
    direction: MindElixir.RIGHT,
    ...options,
  });

  return mind;
}

export function drawMind(mind, data) {
  return isInitialized(mind) ? mind.refresh(data) : mind.init(data);
}

export function isInitialized(mind) {
  return Boolean(mind.getData().nodeData);
}

export const exportToSvg = (mind) => exportToImage(mind, "svg");
export const exportToPng = (mind) => exportToImage(mind, "png");

export async function exportToImage(mind, type) {
  if (!["png", "svg"].includes(type)) {
    throw new Error(`Cannot export to ${type}. Unimplemented type`);
  }

  const blob =
    type === "svg" ? await mind.exportSvg(false) : await mind.exportPng(false);
  if (!blob) {
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: `mindo-export.${type}`,
  });

  a.click();
  URL.revokeObjectURL(url);
}
