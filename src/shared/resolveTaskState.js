// File shared between extension and webview
import { getTaskConfig } from "./config.js";
import { TaskState } from "./constants.js";

export function resolveTaskState(topic) {
  const doneConfig = getTaskConfig(TaskState.DONE);
  if (topic.startsWith(doneConfig.identifier)) {
    return TaskState.DONE;
  }

  const inProgressConfig = getTaskConfig(TaskState.IN_PROGRESS);
  if (topic.startsWith(inProgressConfig.identifier)) {
    return TaskState.IN_PROGRESS;
  }

  return TaskState.IDLE;
}
