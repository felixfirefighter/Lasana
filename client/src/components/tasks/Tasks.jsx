import React, { Fragment } from "react";

import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <Fragment>
      {tasks.map(({ _id, name, isCompleted }) => {
        return (
          <Task _id={_id} name={name} isCompleted={isCompleted} key={_id} />
        );
      })}
    </Fragment>
  );
};

export default Tasks;
