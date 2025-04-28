import { getMindyView } from "./__manager";
import * as vscode from "vscode";

export function drawMindmap(editor: vscode.TextEditor, text: string) {
  const panel = getMindyView(editor);
  if (panel) {
    panel.webview.postMessage({
      command: "draw",
      text,
    });
  }
}
