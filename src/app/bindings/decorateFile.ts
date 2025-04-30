import * as vscode from "vscode";
import { renderMindoFileAppearance } from "../../mindo";

export function decorateFile({ subscriptions }: vscode.ExtensionContext) {
  if (vscode.window.activeTextEditor) {
    renderMindoFileAppearance(vscode.window.activeTextEditor);
  }

  // prettier-ignore
  vscode.window.onDidChangeActiveTextEditor(renderMindoFileAppearance, null, subscriptions);
  // prettier-ignore
  vscode.workspace.onDidChangeTextDocument(() => {
    // vscode.window.activeTextEditor will not always be the origin of the changes...
    // but it will be ok 80% of the time.
    renderMindoFileAppearance(vscode.window.activeTextEditor);
  }, null, subscriptions);
}
