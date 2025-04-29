import * as vscode from "vscode";
import { getMindyView } from "./__manager";
import { textToNodes } from "./textToNodes";

export function drawMindmap(editor: vscode.TextEditor, text: string) {
  const panel = getMindyView(editor);
  if (panel) {
    const dataMind = textToNodes(text);
    panel.webview.postMessage({
      command: "draw",
      dataMind,
    });
  }
}
