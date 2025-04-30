// import { findFirstVisibleEditor } from "../utils";
import * as vscode from "vscode";
import { isMindoEditor } from "./isMindoEditor";
import { findFirstVisibleEditor } from "../utils";

export function findMindoTextEditor() {
  const activeEditor =
    vscode.window.activeTextEditor || findFirstVisibleEditor();
  return isMindoEditor(activeEditor) ? activeEditor : null;
}
