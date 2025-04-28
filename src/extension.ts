import * as vscode from "vscode";
import { debounce } from "lodash-es";
import { findFirstVisibleEditor } from "./utils";
import { drawMindmap, getMindyView, showMindyView } from "./mindy-view";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  const disposableCreateFile = vscode.commands.registerCommand(
    "mindy.createFile",
    async () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        return vscode.window.showErrorMessage(
          "No active editor found. Cannot create mindy file"
        );
      }
      const workingWorkspace = vscode.workspace.getWorkspaceFolder(
        activeEditor.document.uri
      );
      if (!workingWorkspace) {
        return vscode.window.showErrorMessage(
          "No active workspace found. Cannot create mindy file"
        );
      }

      // TODO: handle custom user indent
      const content = Buffer.from(`- Chocolate Milk
  - ✔ Watch tutorial
  - ▶ Recipe
    - ▶ Chocolate
    - ▶ Milk
    - ☐ Mix everything together
      - Taste
      - Add sugar if needed
  - ☐ Enjoy`);

      const uri = vscode.Uri.file(workingWorkspace.uri.fsPath + "/MINDY");

      const hasFile = await doesFileExist(uri);
      if (!hasFile) {
        await vscode.workspace.fs.writeFile(uri, content);
      }

      const document = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(document);

      vscode.commands.executeCommand("mindy.showView");
    }
  );

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
        drawMindmap(editor, updatedText);
      }
    }, 300)
  );

  // TODO
  const disposableToggleTask = vscode.commands.registerCommand(
    "mindy.toggleTask",
    () => {
      console.log("mindy.toggleTask !!");
      // const editor = vscode.window.activeTextEditor;
      // if (!editor) {
      //   return;
      // }

      // const document = editor.document;
      // const position = editor.selection.active;
      // console.log("position", position);
      // const line = document.lineAt(position.line);
      // console.log("line", line);
      // editor.edit((editBuilder) => {
      //   // Example: replace the entire line with "Modified Line"
      //   editBuilder.replace(line.range, "Modified Line");
      // });
    }
  );

  context.subscriptions.push(
    ...[disposableCreateFile, disposableShowView, disposableToggleTask]
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

// function defineContext(editor: vscode.TextEditor | undefined) {
//   const isMindyFile = editor?.document.uri.fsPath.endsWith(".mindy") || false;
//   console.log("isMindyFile", isMindyFile);
//   vscode.commands.executeCommand("setContext", "mindyFile", isMindyFile);
// }

async function doesFileExist(uri: vscode.Uri): Promise<Boolean> {
  try {
    // VSCcode Thenable types do not have .catch chain method unfortunately
    return await vscode.workspace.fs.stat(uri).then((res) => true);
  } catch (e) {
    return false;
  }
}
