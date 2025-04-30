export enum Command {
  CREATE_OR_OPEN_PROJECT = "mindo.createOrOpenProject",
  SHOW_VIEW = "mindo.showView",
  TOGGLE_TASK = "mindo.toggleTask",
  TOGGLE_START = "mindo.toggleStart",
  TOGGLE_DONE = "mindo.toggleDone",
}

export enum TaskState {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  IDLE = "IDLE",
}

export const MINDO_LANG_ID = "mindo";
