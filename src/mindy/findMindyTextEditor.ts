import { findFirstVisibleEditor } from "../utils";
import { isMindyEditor } from "./isMindyEditor";

export function findMindyTextEditor() {
  const firstEditor = findFirstVisibleEditor();
  return isMindyEditor(firstEditor) ? firstEditor : null;
}
