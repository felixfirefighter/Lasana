import {
  ADD_PROJECT,
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL
} from "../actions/types";

const initialState = {
  addProjectModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      console.log("SHOW");
      return {
        ...state,
        addProjectModal: true
      };
    case ADD_PROJECT:
    case HIDE_ADD_PROJECT_MODAL:
      console.log("HIDE");
      return {
        ...state,
        addProjectModal: false
      };
    default:
      return state;
  }
}
