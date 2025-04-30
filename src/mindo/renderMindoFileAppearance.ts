import * as vscode from "vscode";
import { TaskState } from "../constants";
import { config } from "../config";
import { isMindoEditor } from "./isMindoEditor";
import { resolveTaskState } from "./resolveTaskState";

const decorations: Record<string, vscode.TextEditorDecorationType> = {
  [TaskState.DONE]: vscode.window.createTextEditorDecorationType({
    color: config.tasks.DONE.color,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  }),
  [TaskState.IN_PROGRESS]: vscode.window.createTextEditorDecorationType({
    color: config.tasks.IN_PROGRESS.color,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  }),
};

export function renderMindoFileAppearance(editor?: vscode.TextEditor) {
  if (!editor || !isMindoEditor(editor)) {
    return;
  }

  const { document } = editor;

  const rangesByState: Record<string, vscode.Range[]> = {
    [TaskState.DONE]: [],
    [TaskState.IN_PROGRESS]: [],
    [TaskState.IDLE]: [],
  };
  for (let i = 0; i < document.lineCount; i++) {
    const { range } = document.lineAt(i);
    const textLine = document.getText(range);
    const state = resolveDecorationState(textLine);
    rangesByState[state]?.push(range);
  }

  for (const [state, ranges] of Object.entries(rangesByState)) {
    const decoration = decorations[state];
    if (decoration) {
      editor.setDecorations(decoration, ranges);
    }
  }
}

function resolveDecorationState(text: string) {
  const [, topic] = text.split("-");
  return topic && resolveTaskState(topic.trim());
}
