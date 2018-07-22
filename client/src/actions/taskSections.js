import axios from "axios";

import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from "./types";

export const addTask = (sectionId, data) => async dispatch => {
  try {
    const res = await axios.post(`/api/sections/${sectionId}/tasks`, data);
    console.log(res.data);
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (id, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/tasks/${id}`, data);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
