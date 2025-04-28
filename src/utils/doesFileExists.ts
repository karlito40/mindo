import * as vscode from "vscode";

export async function doesFileExists(uri: vscode.Uri): Promise<Boolean> {
  try {
    // VSCcode Thenable type does not have a .catch chain method unfortunately
    return await vscode.workspace.fs.stat(uri).then(() => true);
  } catch (e) {
    return false;
  }
}
