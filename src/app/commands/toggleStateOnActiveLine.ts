import * as vscode from "vscode";
import { isMindyEditor, toggleStateLine } from "../../mindy";

export function toggleStateOnActiveLine(stateIdentifier: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !isMindyEditor(editor)) {
    return;
  }

  const { document } = editor;
  const position = editor.selection.active;
  const line = document.lineAt(position.line);
  const updatedText = toggleStateLine(line, stateIdentifier);

  if (updatedText !== line.text) {
    editor.edit((editBuilder) => {
      editBuilder.replace(line.range, updatedText);
    });
  }
}
