import * as vscode from "vscode";
import { debounce } from "lodash-es";
import { drawMindmap, findMindoTextEditor } from "../../mindo";

export function textToMindmap({ subscriptions }: vscode.ExtensionContext) {
  // prettier-ignore
  vscode.workspace.onDidChangeTextDocument(debounce((event) => {
    renderTasks(event.document);
  }, 300), null, subscriptions);

  // prettier-ignore
  vscode.window.onDidChangeActiveTextEditor((event) => {
    event && renderTasks(event.document);
  }, null, subscriptions);
}

function renderTasks(targetedDocument: vscode.TextDocument) {
  const editor = findMindoTextEditor();

  if (editor?.document === targetedDocument) {
    const updatedText = editor.document.getText();
    drawMindmap(editor, updatedText);
  }
}
