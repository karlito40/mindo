import * as vscode from "vscode";
import { taskConfigs } from "../config";

export function toggleStateLine(
  line: vscode.TextLine,
  stateIdentifier: string
) {
  const { text, firstNonWhitespaceCharacterIndex } = line;
  console.log("toggleStateLine on line", line);
  const topic = text.substring(firstNonWhitespaceCharacterIndex);
  const indent = text.substring(0, firstNonWhitespaceCharacterIndex);

  const cleanedText = removeUnrelatedStates(text, stateIdentifier);

  if (!cleanedText.includes("-")) {
    console.log(`create ${stateIdentifier} task for`, topic);
    return `${indent}- ${stateIdentifier} ${topic}`;
  }

  if (cleanedText.includes(stateIdentifier)) {
    console.log(`move task to comment`);
    return removeIdentifier(cleanedText, stateIdentifier);
  } else {
    console.log(`move comment to task: ${stateIdentifier}`);
    return insertIdentifier(cleanedText, stateIdentifier);
  }
}

function removeUnrelatedStates(text: string, relatedStateIdentifier: string) {
  const unrelatedConfigs = taskConfigs.filter(
    (taskConfig: any) => taskConfig.identifier !== relatedStateIdentifier
  );

  return unrelatedConfigs.reduce((acc: string, unrelatedConfig: any) => {
    return removeIdentifier(acc, unrelatedConfig.identifier);
  }, text);
}

function removeIdentifier(text: string, identifier: string) {
  return text.replace(` ${identifier}`, "").replace(identifier, "");
}

function insertIdentifier(text: string, identifier: string) {
  const [indent, topic] = text.split("-");
  const formattedTopic = topic.startsWith(" ") ? topic.replace(" ", "") : topic;

  return `${indent}- ${identifier} ${formattedTopic}`;
}
