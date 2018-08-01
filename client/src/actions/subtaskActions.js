import axios from "axios";

import {
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  UPDATE_SUBTASK_STATUS,
  DELETE_SUBTASK
} from "./types";

export const addSubtask = (taskId, data) => async dispatch => {
  try {
    const res = await axios.post(`/api/tasks/${taskId}/subtasks`, data);
    dispatch({
      type: ADD_SUBTASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSubtask = (id, data) => async dispatch => {
  try {
    const res = await axios.put(`/api/subtasks/${id}`, data);
    dispatch({
      type: UPDATE_SUBTASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSubtaskStatus = id => async dispatch => {
  try {
    const res = await axios.put(`/api/subtasks/${id}/updateStatus`);
    dispatch({
      type: UPDATE_SUBTASK_STATUS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSubtask = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/subtasks/${id}`);
    dispatch({
      type: DELETE_SUBTASK,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
