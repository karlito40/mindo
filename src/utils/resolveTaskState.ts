import { __ctask } from "../config";
import { TaskState } from "../constants";

export function resolveTaskState(topic: string) {
  const doneConfig = __ctask(TaskState.DONE);
  if (topic.startsWith(doneConfig.identifier)) {
    return TaskState.DONE;
  }

  const inProgressConfig = __ctask(TaskState.IN_PROGRESS);
  if (topic.startsWith(inProgressConfig.identifier)) {
    return TaskState.IN_PROGRESS;
  }

  return TaskState.IDLE;
}
