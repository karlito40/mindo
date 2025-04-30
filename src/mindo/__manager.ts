import * as vscode from "vscode";

const mindoViews = new Map();

export function hasMindoView(editor?: vscode.TextEditor) {
  return Boolean(editor && mindoViews.has(editor));
}

export function saveMindoView(
  editor: vscode.TextEditor,
  view: vscode.WebviewPanel
) {
  return mindoViews.set(editor, view);
}
export function deleteMindoView(editor: vscode.TextEditor) {
  mindoViews.delete(editor);
}

export function getMindoView(editor: vscode.TextEditor): vscode.WebviewPanel {
  return mindoViews.get(editor);
}
