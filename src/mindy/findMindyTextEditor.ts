import { MINDY_LANG_ID } from "../shared/constants";
import { findFirstVisibleEditor } from "../utils";

export function findMindyTextEditor() {
  const firstEditor = findFirstVisibleEditor();
  return firstEditor?.document.languageId === MINDY_LANG_ID
    ? firstEditor
    : null;
}
