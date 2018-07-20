import axios from "axios";

import { ADD_SECTION, UPDATE_SECTION, DELETE_SECTION } from "./types";

export const addSection = (projectId, data) => async dispatch => {
  try {
    const res = await axios.post(`/api/projects/${projectId}/sections`, data);
    dispatch({
      type: ADD_SECTION,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSection = (id, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/sections/${id}`, data);
    dispatch({
      type: UPDATE_SECTION,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSection = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/sections/${id}`);
    dispatch({
      type: DELETE_SECTION,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
