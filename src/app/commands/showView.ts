import * as vscode from "vscode";
import { findMindoTextEditor, showMindoView } from "../../mindo";

export function showView(context: vscode.ExtensionContext) {
  const editor = findMindoTextEditor();
  if (!editor) {
    return vscode.window.showErrorMessage("No file to render");
  }

  showMindoView(context, editor);
}
