import {
  GET_TASK,
  UPDATE_TASK_STATUS,
  SHOW_TASK_MODAL,
  ADD_SUBTASK
} from "../actions/types";

const initialState = {
  activeTask: {},
  activeTaskLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_TASK_MODAL:
      return {
        ...state,
        activeTaskLoading: true
      };
    case GET_TASK:
    case ADD_SUBTASK:
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        activeTask: action.payload,
        activeTaskLoading: false
      };
    default:
      return state;
  }
}
