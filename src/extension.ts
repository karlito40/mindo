import * as vscode from "vscode";

import { Command } from "./shared/constants.js";
import { createOrOpenProject } from "./app/commands/createOrOpenProject";
import { showView } from "./app/commands/showView";
import { toggleTask } from "./app/commands/toggleTask";
import { textToMindmap } from "./app/bindings/textToMindmap";
import { decorateFile } from "./app/bindings/decorateFile";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  const bindings = [decorateFile, textToMindmap];
  bindings.forEach((binding) => binding(context));

  const commands = [
    // prettier-ignore
    vscode.commands.registerCommand(Command.CREATE_OR_OPEN_PROJECT, createOrOpenProject),
    // prettier-ignore
    vscode.commands.registerCommand(Command.SHOW_VIEW, showView.bind(null, context)),
    // prettier-ignore
    vscode.commands.registerCommand(Command.TOGGLE_TASK, toggleTask),
  ];
  context.subscriptions.push(...commands);
}

export function deactivate() {}
