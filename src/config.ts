import { TaskState } from "./constants";

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

export function __ctask(state: TaskState) {
  return config.tasks[state];
}
