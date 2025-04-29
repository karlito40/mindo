import { TaskState } from "../../shared/constants.js";
import { getTaskConfig } from "../../shared/config.js";
import { toggleStateOnActiveLine } from "./toggleStateOnActiveLine";

export function toggleStart() {
  const startIdentifier = getTaskConfig(TaskState.IN_PROGRESS).identifier;
  return toggleStateOnActiveLine(startIdentifier);
}
