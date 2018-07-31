import { SHOW_TASK_MODAL, UPDATE_TASK_STATUS } from "../actions/types";

const initialState = {
  activeTask: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_TASK_MODAL:
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        activeTask: action.payload
      };
    default:
      return state;
  }
}
