import { SHOW_ADD_PROJECT_MODAL, HIDE_ADD_PROJECT_MODAL } from "./types";

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
