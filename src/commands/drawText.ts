import * as vscode from "vscode";
import { drawMindmap, findMindyTextEditor } from "../mindy";

export function drawText(targetedDocument: vscode.TextDocument) {
  const editor = findMindyTextEditor();

  if (editor?.document === targetedDocument) {
    const updatedText = editor.document.getText();
    drawMindmap(editor, updatedText);
  }
}
