import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  CLEAR_PROJECT,
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION
} from "../actions/types";

const initialState = {
  project: {},
  projects: []
};

export default function(state = initialState, action) {
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
      const updateProjectIndex = state.projects.findIndex(
        project => project._id === action.payload._id
      );
      return {
        ...state,
        project: action.payload,
        projects: [
          ...state.projects.slice(0, updateProjectIndex),
          {
            ...action.payload
          },
          ...state.projects.slice(updateProjectIndex + 1)
        ]
      };
    case DELETE_PROJECT:
      return {
        ...state,
        project: {},
        projects: state.projects.filter(p => p._id !== action.payload)
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        project: {}
      };
    case ADD_SECTION:
      return {
        ...state,
        project: action.payload
      };
    case UPDATE_SECTION:
      return {
        ...state,
        project: action.payload
      };
    case DELETE_SECTION:
      return {
        ...state,
        project: {
          ...state.project,
          sections: state.project.sections.filter(s => s._id !== action.payload)
        }
      };
    default:
      return state;
  }
}
