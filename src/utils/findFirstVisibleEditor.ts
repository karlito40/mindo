import * as vscode from "vscode";

export function findFirstVisibleEditor() {
  return vscode.window.visibleTextEditors.find(
    (editor) => editor.viewColumn === vscode.ViewColumn.One
  );
}
