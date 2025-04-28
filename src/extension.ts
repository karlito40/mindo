import * as vscode from "vscode";

import { Command } from "./shared/constants.js";
import { createOrOpenProject } from "./commands/createOrOpenProject";
import { showView } from "./commands/showView";
import { toggleTask } from "./commands/toggleTask";
import { textToMindmap } from "./middlewares/textToMindmap";
import { decorateFile } from "./middlewares/decorateFile";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  const middlewares = [decorateFile, textToMindmap];

  middlewares.forEach((middleware) => middleware(context));

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
