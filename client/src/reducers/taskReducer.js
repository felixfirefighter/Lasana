import {
  GET_TASK,
  UPDATE_TASK_STATUS,
  SHOW_TASK_MODAL,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  UPDATE_SUBTASK_STATUS
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
    case UPDATE_SUBTASK:
      return {
        ...state,
        activeTask: action.payload,
        activeTaskLoading: false
      };
    case UPDATE_SUBTASK_STATUS:
      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          subtasks: [
            ...state.activeTask.subtasks.map(s => {
              if (s._id !== action.payload) return s;
              return { ...s, isCompleted: !s.isCompleted };
            })
          ]
        }
      };
    default:
      return state;
  }
}
