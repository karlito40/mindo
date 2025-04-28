import * as vscode from "vscode";
import { findMindyTextEditor, showMindyView } from "../mindy";

export function showView(context: vscode.ExtensionContext) {
  const editor = findMindyTextEditor();
  if (!editor) {
    return vscode.window.showErrorMessage("No file to render");
  }

  showMindyView(context, editor);
}
