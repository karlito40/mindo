import * as vscode from "vscode";
import { drawMindmap, getMindyView } from "../mindy";
import { findFirstVisibleEditor } from "../utils";

export function drawText(targetedDocument: vscode.TextDocument) {
  const editor = findFirstVisibleEditor();
  const mindyView = editor && getMindyView(editor);
  // mindy view is not open
  if (!mindyView) {
    return;
  }

  if (editor && editor.document === targetedDocument) {
    const updatedText = editor.document.getText();
    drawMindmap(editor, updatedText);
  }
}
