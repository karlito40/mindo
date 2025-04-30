import { findFirstVisibleEditor } from "../utils";
import { isMindoEditor } from "./isMindoEditor";

export function findMindoTextEditor() {
  const firstEditor = findFirstVisibleEditor();
  return isMindoEditor(firstEditor) ? firstEditor : null;
}
