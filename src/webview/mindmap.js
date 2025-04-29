import MindElixir from "./mind-elixir-4.5.2.min.js";

export function createMind(querySelector, options) {
  const mind = new MindElixir({
    el: querySelector,
    ...options,
  });

  return mind;
}

export function drawMind(mind, data) {
  return isInitialized(mind) ? mind.refresh(data) : mind.init(data);
}

function isInitialized(mind) {
  return Boolean(mind.getData().nodeData);
}
