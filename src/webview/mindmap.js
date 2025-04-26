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
  const [mainTopic, ...lines] = text.split("\n").filter((line) => line.length);
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
    const depth = spaces.length / DELIMITER_WIDTH;
    const formattedLine = {
      id: ID(),
      topic,
      children: [],
    };
    lastChapterByDepths[depth] = formattedLine;

    // lorsque la profondeur change, le chapitre de référence change également
    if (lastDepth !== depth) {
      targetedChapter = lastChapterByDepths[depth - 1] || rootChapter;
    }

    lastDepth = depth;
    targetedChapter.children.push(formattedLine);
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
