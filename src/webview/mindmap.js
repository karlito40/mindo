import MindElixir from "./mind-elixir-4.5.2.min.js";

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
