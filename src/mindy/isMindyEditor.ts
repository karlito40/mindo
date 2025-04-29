import * as vscode from "vscode";
import { MINDY_LANG_ID } from "../constants";

export function isMindyEditor(editor?: vscode.TextEditor) {
  return editor?.document.languageId === MINDY_LANG_ID;
}
