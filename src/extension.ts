import * as vscode from "vscode";
import { debounce } from "lodash-es";
import { Command } from "./constants";
import { createOrOpenProject } from "./commands/createOrOpenProject";
import { showView } from "./commands/showView";
import { toggleTask } from "./commands/toggleTask";
import { drawText } from "./commands/drawText";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  const drawTextDebounced = debounce((event) => {
    drawText(event.document);
  }, 300);

  const disposables = [
    // prettier-ignore
    vscode.commands.registerCommand(Command.CREATE_OR_OPEN_PROJECT, createOrOpenProject),
    // prettier-ignore
    vscode.commands.registerCommand(Command.SHOW_VIEW, showView.bind(null, context)),
    // prettier-ignore
    vscode.commands.registerCommand(Command.TOGGLE_TASK, toggleTask),
    // prettier-ignore
    vscode.workspace.onDidChangeTextDocument(drawTextDebounced),
  ];
  // prettier-ignore
  context.subscriptions.push(...disposables);
}

export function deactivate() {}
