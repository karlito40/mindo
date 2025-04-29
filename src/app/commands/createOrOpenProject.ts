import * as vscode from "vscode";
import { doesFileExists } from "../../utils";
import { Command } from "../../shared/constants";

// TODO: Use custom user indentation
const defaultFileText = `- Chocolate Milk
- ✔ Watch tutorial
- ▶ Recipe
- ▶ Chocolate
- ▶ Milk
- ☐ Mix everything together
  - Taste
  - Add sugar if needed
- ☐ Enjoy`;

export async function createOrOpenProject() {
  const firstWorkspaceFolder = vscode.workspace.workspaceFolders?.[0];
  const activeEditor = vscode.window.activeTextEditor;
  const workingWorkspaceFolder =
    activeEditor &&
    vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);

  const targetedWorkpaceFolder = workingWorkspaceFolder || firstWorkspaceFolder;
  if (!targetedWorkpaceFolder) {
    if (!activeEditor) {
      return vscode.window.showErrorMessage(
        "No active editor found. Cannot create mindy file"
      );
    }

    if (!workingWorkspaceFolder) {
      return vscode.window.showErrorMessage(
        "No active workspace found. Cannot create mindy file"
      );
    }
    return vscode.window.showErrorMessage("Oops. An unknow errr happened");
  }

  const content = Buffer.from(defaultFileText);
  const uri = vscode.Uri.file(targetedWorkpaceFolder.uri.fsPath + "/MINDY");

  const hasFile = await doesFileExists(uri);
  if (!hasFile) {
    await vscode.workspace.fs.writeFile(uri, content);
  }

  const document = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(document);

  vscode.commands.executeCommand(Command.SHOW_VIEW);
}
