import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  errors: errorReducer
});
