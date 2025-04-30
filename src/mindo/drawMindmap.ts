import * as vscode from "vscode";
import { getMindoView } from "./__manager";
import { textToNodes } from "./textToNodes";

export function drawMindmap(editor: vscode.TextEditor, text: string) {
  const panel = getMindoView(editor);
  if (panel) {
    const dataMind = textToNodes(text);
    panel.webview.postMessage({
      command: "draw",
      dataMind,
    });
  }
}
