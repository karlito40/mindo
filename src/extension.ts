import * as vscode from "vscode";
import { debounce } from "lodash-es";
import { findFirstVisibleEditor } from "./utils";
import { drawMindmap, getMindyView, showMindyView } from "./mindy-view";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  // prettier-ignore
  const disposableShowView = vscode.commands.registerCommand("mindy.showView", () => {
		const editor = findFirstVisibleEditor();
		if (!editor) {
			return vscode.window.showErrorMessage("No file to render");
		}

		showMindyView(context, editor);
	});

  vscode.workspace.onDidChangeTextDocument(
    debounce((event: any) => {
      const editor = findFirstVisibleEditor();
      const mindyView = editor && getMindyView(editor);
      if (!mindyView) {
        return;
      }

      if (editor && editor.document === event.document) {
        const updatedText = editor.document.getText();
        console.log("updated text:", updatedText);
        drawMindmap(editor, updatedText);
      }
    }, 300)
  );

  context.subscriptions.push(disposableShowView);
}

// This method is called when your extension is deactivated
export function deactivate() {}
