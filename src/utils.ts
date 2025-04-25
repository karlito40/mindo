import * as vscode from "vscode";

export function findFirstVisibleEditor() {
  return vscode.window.visibleTextEditors.find(
    (e) => e.viewColumn === vscode.ViewColumn.One
  );
}

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
