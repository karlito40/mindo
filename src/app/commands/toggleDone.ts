import { TaskState } from "../../shared/constants.js";
import { getTaskConfig } from "../../shared/config.js";
import { toggleStateOnActiveLine } from "./toggleStateOnActiveLine";

export function toggleDone() {
  const doneIdentifier = getTaskConfig(TaskState.DONE).identifier;
  return toggleStateOnActiveLine(doneIdentifier);
}
