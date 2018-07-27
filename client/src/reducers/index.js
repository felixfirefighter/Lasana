import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import navReducer from "./navReducer";
import errorReducer from "./errorReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  nav: navReducer,
  errors: errorReducer,
  tasks: taskReducer
});
