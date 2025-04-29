import { __ctask } from "../../config";
import { TaskState } from "../../constants";
import { toggleStateOnActiveLine } from "./toggleStateOnActiveLine";

export function toggleDone() {
  const { identifier } = __ctask(TaskState.DONE);
  return toggleStateOnActiveLine(identifier);
}
