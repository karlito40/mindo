// File shared between extension and webview
import { TaskState } from "./constants.js";

// TODO: light and dark theme
export const config = {
  tasks: {
    [TaskState.DONE]: {
      color: "#a6e22e",
      identifier: "✔",
    },
    [TaskState.IN_PROGRESS]: {
      color: "#cbbf6a",
      identifier: "▶",
    },
    [TaskState.IDLE]: {
      color: null,
      identifier: null,
    },
  },
};

export function getTaskConfig(state) {
  return config.tasks[state];
}
