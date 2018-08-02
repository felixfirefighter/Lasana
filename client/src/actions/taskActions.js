import axios from "axios";

import {
  GET_TASK,
  ADD_TASK,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
  DELETE_TASK
} from "./types";

export const getTask = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tasks/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const addTask = (sectionId, data) => async dispatch => {
  try {
    const res = await axios.post(`/api/sections/${sectionId}/tasks`, data);
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

export const updateTaskStatus = id => async dispatch => {
  try {
    const res = await axios.put(`/api/tasks/${id}/updateStatus`);
    dispatch({
      type: UPDATE_TASK_STATUS,
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
