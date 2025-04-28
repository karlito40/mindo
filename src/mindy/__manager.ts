import * as vscode from "vscode";

const mindyViews = new Map();

export function hasMindyView(editor?: vscode.TextEditor) {
  return Boolean(editor && mindyViews.has(editor));
}

export function saveMindyView(
  editor: vscode.TextEditor,
  view: vscode.WebviewPanel
) {
  return mindyViews.set(editor, view);
}
export function deleteMindyView(editor: vscode.TextEditor) {
  mindyViews.delete(editor);
}

export function getMindyView(editor: vscode.TextEditor): vscode.WebviewPanel {
  return mindyViews.get(editor);
}
