import * as vscode from "vscode";
import { debounce } from "lodash-es";
import { drawMindmap, findMindyTextEditor } from "../../mindy";

export function textToMindmap({ subscriptions }: vscode.ExtensionContext) {
  // prettier-ignore
  vscode.workspace.onDidChangeTextDocument(debounce((event) => {
    renderTasks(event.document);
  }, 300), null, subscriptions);
}

function renderTasks(targetedDocument: vscode.TextDocument) {
  const editor = findMindyTextEditor();

  if (editor?.document === targetedDocument) {
    const updatedText = editor.document.getText();
    drawMindmap(editor, updatedText);
  }
}
