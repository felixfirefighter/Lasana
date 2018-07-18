import {
  ADD_PROJECT,
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  SHOW_UPDATE_PROJECT_MODAL,
  HIDE_UPDATE_PROJECT_MODAL,
  UPDATE_PROJECT
} from "../actions/types";

const initialState = {
  addProjectModal: false,
  updateProjectModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      return {
        ...state,
        addProjectModal: true
      };
    case ADD_PROJECT:
    case HIDE_ADD_PROJECT_MODAL:
      return {
        ...state,
        addProjectModal: false
      };
    case SHOW_UPDATE_PROJECT_MODAL:
      return {
        ...state,
        updateProjectModal: true
      };
    case UPDATE_PROJECT:
    case HIDE_UPDATE_PROJECT_MODAL:
      return {
        ...state,
        updateProjectModal: false
      };
    default:
      return state;
  }
}
