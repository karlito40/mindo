import * as vscode from "vscode";
import { MINDO_LANG_ID } from "../constants";

export function isMindoEditor(editor?: vscode.TextEditor) {
  return editor?.document.languageId === MINDO_LANG_ID;
}
