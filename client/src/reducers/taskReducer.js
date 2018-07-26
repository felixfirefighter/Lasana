import { SHOW_TASK_MODAL } from "../actions/types";

const initialState = {
  activeTask: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_TASK_MODAL:
      return {
        ...state,
        activeTask: action.payload
      };
    default:
      return state;
  }
}
