import * as vscode from "vscode";

import { Command } from "./shared/constants.js";
import { createOrOpenProject } from "./app/commands/createOrOpenProject";
import { showView } from "./app/commands/showView";
import { toggleTask } from "./app/commands/toggleTask";
import { toggleStart } from "./app/commands/toggleStart";
import { textToMindmap } from "./app/bindings/textToMindmap";
import { decorateFile } from "./app/bindings/decorateFile";
import { toggleDone } from "./app/commands/toggleDone";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mindy" is now active!');

  // prettier-ignore
  bindings(context, [
    decorateFile,
    textToMindmap
  ]);

  const commands = [
    // prettier-ignore
    vscode.commands.registerCommand(Command.CREATE_OR_OPEN_PROJECT, createOrOpenProject),
    // prettier-ignore
    vscode.commands.registerCommand(Command.SHOW_VIEW, showView.bind(null, context)),
    vscode.commands.registerCommand(Command.TOGGLE_TASK, toggleTask),
    vscode.commands.registerCommand(Command.TOGGLE_START, toggleStart),
    vscode.commands.registerCommand(Command.TOGGLE_DONE, toggleDone),
  ];
  context.subscriptions.push(...commands);
}

export function deactivate() {}

type Binding = (context: vscode.ExtensionContext) => any;
export function bindings(context: vscode.ExtensionContext, binds: Binding[]) {
  binds.forEach((binding) => binding(context));
}
