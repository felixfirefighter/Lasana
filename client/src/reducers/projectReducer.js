import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  GET_PROJECTS
} from "../actions/types";

const initialState = {
  project: {},
  projects: []
};

export default function(state = initialState, action) {
  const index = state.projects.findIndex(
    project => project._id === action.payload._id
  );

  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: { ...action.payload }
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, ...action.payload]
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
        projects: [
          ...state.projects.slice(0, index),
          {
            ...action.payload
          },
          ...state.projects.slice(index + 1)
        ]
      };
    case DELETE_PROJECT:
      return {
        ...state,
        project: action.payload,
        projects: [
          ...state.projects.slice(0, index),
          ...state.projects.slice(index + 1)
        ]
      };
    default:
      return state;
  }
}
