import * as vscode from "vscode";
import { showMindyView } from "../mindy";
import { findFirstVisibleEditor } from "../utils";

export function showView(context: vscode.ExtensionContext) {
  const editor = findFirstVisibleEditor();
  if (!editor) {
    return vscode.window.showErrorMessage("No file to render");
  }

  showMindyView(context, editor);
}
