import MindElixir from "./mind-elixir-4.5.2.min.js";

let currentId = 0;
const ID = () => String(++currentId);

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

const SPACE_DELIMITER = "SPACE";
const DELIMITER_WIDTH = 2;

export function resolveText(text) {
  const [mainTopic, ...lines] = text
    .split("\n")
    .filter((line) => line.trim().length);
  if (!mainTopic) {
    return;
  }

  const rootChapter = makeNode(mainTopic.split("-")[1]);

  let lastDepth = 0;
  const lastChapterByDepths = {
    [lastDepth]: rootChapter,
  };

  let targetedChapter = rootChapter;
  for (const line of lines) {
    const [spaces, topic] = line.split("-");
    console.log("line", line, "topic", topic);
    const depth = spaces.length / DELIMITER_WIDTH;
    const formattedTopic = topic.trim();
    const nodeState = resolveNodeState(formattedTopic);
    console.log("formattedTopic", formattedTopic, nodeState);
    const node = {
      id: ID(),
      topic: formattedTopic,
      children: [],
      style: resolveNodeStyle(nodeState),
    };
    lastChapterByDepths[depth] = node;

    // lorsque la profondeur change, le chapitre de référence change également
    if (lastDepth !== depth) {
      targetedChapter = lastChapterByDepths[depth - 1] || rootChapter;
    }

    lastDepth = depth;
    targetedChapter.children.push(node);
  }

  return {
    nodeData: rootChapter,
  };
}

function makeNode(text) {
  return {
    id: ID(),
    topic: text,
    children: [],
  };
}

function resolveNodeState(topic) {
  if (topic.startsWith("✔")) {
    return "complete";
  }

  if (topic.startsWith("▶")) {
    return "in_progress";
  }

  return "idle";
}

const colorMap = {
  complete: "#9edc3e",
  in_progress: "#cbbf6a",
};

function resolveNodeStyle(state) {
  // no style to apply when idle
  if (state === "idle") {
    return;
  }

  return {
    color: colorMap[state],
  };
}
