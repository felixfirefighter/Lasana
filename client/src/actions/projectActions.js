import axios from "axios";

import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  CLEAR_PROJECT,
  GET_ERRORS
} from "./types";

export const getProjects = () => async dispatch => {
  try {
    const res = await axios.get("/api/projects");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProject = id => async dispatch => {
  try {
    dispatch({
      type: CLEAR_PROJECT
    });

    const res = await axios.get(`/api/projects/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addProject = (data, history) => async dispatch => {
  try {
    const res = await axios.post(`/api/projects`, data);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data
    });

    history.push(`/projects/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updateProject = (id, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/projects/${id}`, data);

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteProject = (id, data) => async dispatch => {
  try {
    const res = await axios.delete(`/api/projects/${id}`, data);

    dispatch({
      type: DELETE_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
