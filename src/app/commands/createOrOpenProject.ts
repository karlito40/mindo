import * as vscode from "vscode";
import { doesFileExists } from "../../utils";
import { Command } from "../../constants";

// TODO: Use custom user indentation
// const config = vscode.workspace.getConfiguration('editor');
// const tabSize = config.get<number>('tabSize');
// const insertSpaces = config.get<boolean>('insertSpaces');
const defaultFileText = `- Welcome
  - ☐ Mindo
    - Organize your tasks
    - ▶ Test
      - ☐ Execute command "> Mindo: Open"
      - ▶ Shortcuts
        - On Mac
          - ☐ cmd + Enter to create a task (or revert)
          - ☐ Option + s to start a task (or revert)
          - ☐ Option + d to complete a task (or revert)
        - On Others
          - ☐ ctrl + Enter to create a task (or revert)
          - ☐ Alt + s to start a task
          - ☐ Alt + d to complete a task
      - ☐ Live preview it
        - ☐ Execute command "> Mindo: Show View"
        - ☐ Check auto update on changes
  - ▶ Support
    - Ask me on github
      - https://github.com/karlito40/mindo/issues
    - Contributions are welcome
    - ▶ Be kind
  - ✔ Enjoy your life
  - And thanks`;

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
        "No active editor found. Cannot create mindo file"
      );
    }

    if (!workingWorkspaceFolder) {
      return vscode.window.showErrorMessage(
        "No active workspace found. Cannot create mindo file"
      );
    }
    return vscode.window.showErrorMessage("Oops. An unknow errr happened");
  }

  const content = Buffer.from(defaultFileText);
  const uri = vscode.Uri.file(targetedWorkpaceFolder.uri.fsPath + "/MINDO");

  const hasFile = await doesFileExists(uri);
  if (!hasFile) {
    await vscode.workspace.fs.writeFile(uri, content);
  }

  const document = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(document);

  vscode.commands.executeCommand(Command.SHOW_VIEW);
}
