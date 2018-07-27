import {
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  SHOW_UPDATE_PROJECT_MODAL,
  HIDE_UPDATE_PROJECT_MODAL,
  SHOW_DELETE_PROJECT_MODAL,
  HIDE_DELETE_PROJECT_MODAL,
  SHOW_TASK_MODAL,
  HIDE_TASK_MODAL
} from "./types";

export const showAddProjectModal = () => {
  return {
    type: SHOW_ADD_PROJECT_MODAL
  };
};

export const hideAddProjectModal = () => {
  return {
    type: HIDE_ADD_PROJECT_MODAL
  };
};

export const showUpdateProjectModal = () => {
  return {
    type: SHOW_UPDATE_PROJECT_MODAL
  };
};

export const hideUpdateProjectModal = () => {
  return {
    type: HIDE_UPDATE_PROJECT_MODAL
  };
};

export const showDeleteProjectModal = () => {
  return {
    type: SHOW_DELETE_PROJECT_MODAL
  };
};

export const hideDeleteProjectModal = () => {
  return {
    type: HIDE_DELETE_PROJECT_MODAL
  };
};

export const showTaskModal = task => {
  return {
    type: SHOW_TASK_MODAL,
    payload: task
  };
};

export const hideTaskModal = () => {
  return {
    type: HIDE_TASK_MODAL
  };
};
