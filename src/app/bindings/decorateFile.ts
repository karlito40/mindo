import * as vscode from "vscode";
import { renderMindyFileAppearance } from "../../mindy";

export function decorateFile({ subscriptions }: vscode.ExtensionContext) {
  if (vscode.window.activeTextEditor) {
    renderMindyFileAppearance(vscode.window.activeTextEditor);
  }

  // prettier-ignore
  vscode.window.onDidChangeActiveTextEditor(renderMindyFileAppearance, null, subscriptions);
  // prettier-ignore
  vscode.workspace.onDidChangeTextDocument(() => {
    // vscode.window.activeTextEditor will not always be the origin of the changes...
    // but it will be ok 80% of the time.
    renderMindyFileAppearance(vscode.window.activeTextEditor);
  }, null, subscriptions);
}
