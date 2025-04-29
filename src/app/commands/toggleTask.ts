import { TaskState } from "../../constants";
import { __ctask } from "../../config";
import { toggleStateOnActiveLine } from "./toggleStateOnActiveLine";

export function toggleTask() {
  const { identifier } = __ctask(TaskState.IDLE);
  return toggleStateOnActiveLine(identifier);
}
