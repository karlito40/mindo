import { TaskState } from "../../constants";
import { __ctask } from "../../config";
import { toggleStateOnActiveLine } from "./toggleStateOnActiveLine";

export function toggleStart() {
  const { identifier } = __ctask(TaskState.IN_PROGRESS);
  return toggleStateOnActiveLine(identifier);
}
