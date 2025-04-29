export enum Command {
  CREATE_OR_OPEN_PROJECT = "mindy.createOrOpenProject",
  SHOW_VIEW = "mindy.showView",
  TOGGLE_TASK = "mindy.toggleTask",
  TOGGLE_START = "mindy.toggleStart",
  TOGGLE_DONE = "mindy.toggleDone",
}

export enum TaskState {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  IDLE = "IDLE",
}

export const MINDY_LANG_ID = "mindy";
