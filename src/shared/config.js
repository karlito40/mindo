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
      color: "#66d9ef",
      identifier: "▶",
    },
    [TaskState.IDLE]: {
      color: null,
      identifier: "☐",
    },
  },
};

export const taskConfigs = Object.entries(config.tasks).map(
  ([state, taskConfig]) => {
    return {
      ...taskConfig,
      state,
    };
  }
);

export function getTaskConfig(state) {
  return config.tasks[state];
}
