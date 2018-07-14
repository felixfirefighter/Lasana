import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const register = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", userData);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Login - Get User Token
export const login = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);

    setAuthToken(token);

    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
