import * as vscode from "vscode";

export function findFirstVisibleEditor() {
  return vscode.window.visibleTextEditors.find(
    (e) => e.viewColumn === vscode.ViewColumn.One
  );
}
