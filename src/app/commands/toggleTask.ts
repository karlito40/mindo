import { TaskState } from "./../../shared/constants.js";
import * as vscode from "vscode";
import { isMindyEditor } from "../../mindy";
import { getTaskConfig } from "../../shared/config.js";
import { insertElementInString } from "../../utils";

const idleConfig = getTaskConfig(TaskState.IDLE);
const inProgressConfig = getTaskConfig(TaskState.IN_PROGRESS);
const doneConfig = getTaskConfig(TaskState.DONE);

export function toggleTask() {
  console.log("mindy.toggleTask !!");
  const editor = vscode.window.activeTextEditor;
  if (!editor || !isMindyEditor(editor)) {
    return;
  }

  const { document } = editor;
  const position = editor.selection.active;
  const line = document.lineAt(position.line);
  const updatedText = resolveToggle(line);

  if (updatedText !== line.text) {
    editor.edit((editBuilder) => {
      editBuilder.replace(line.range, updatedText);
    });
  }
}

function resolveToggle(line: vscode.TextLine): string {
  const { text, firstNonWhitespaceCharacterIndex } = line;
  const topic = text.substring(firstNonWhitespaceCharacterIndex);
  const indent = text.substring(0, firstNonWhitespaceCharacterIndex);

  const cleanedText = text
    .replace(doneConfig.identifier, "")
    .replace(inProgressConfig.identifier, "");

  if (!cleanedText.includes("-")) {
    console.log("create task for", topic);
    return `${indent}- ${idleConfig.identifier} ${topic}`;
  }

  if (cleanedText.includes(idleConfig.identifier)) {
    console.log("move to task to comment");
    return cleanedText
      .replace(` ${idleConfig.identifier}`, "")
      .replace(idleConfig.identifier, "");
  } else {
    console.log("move comment to task");
    const index = cleanedText.indexOf("-");

    return insertElementInString(
      cleanedText,
      ` ${idleConfig.identifier}`,
      index + 1
    );
  }
}
