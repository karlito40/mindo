import * as vscode from "vscode";
import * as path from "path";
import { debounce } from "lodash-es";
import { findFirstVisibleEditor } from "./utils";
import { getMindyView, showMindyView } from "./mindy-view";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  // prettier-ignore
  const disposableShowView = vscode.commands.registerCommand("mindy.showView", () => {
		const visibleEditor = findFirstVisibleEditor();
		console.log("visibleEditor", visibleEditor);

		if (!visibleEditor) {
			return vscode.window.showErrorMessage("No file to render");
		}

		showMindyView(context, visibleEditor);
	});

  vscode.workspace.onDidChangeTextDocument(
    debounce((event: any) => {
      const editor = findFirstVisibleEditor();
      const mindyView = editor && getMindyView(editor);
      if (!mindyView) {
        return;
      }
      // console.log("editor filename:", editor?.document.fileName);

      if (editor && editor.document === event.document) {
        const updatedText = editor.document.getText();
        console.log("Updated text in Column One:", updatedText);
      }
    }, 300)
  );

  context.subscriptions.push(disposableShowView);
}

// This method is called when your extension is deactivated
export function deactivate() {}
