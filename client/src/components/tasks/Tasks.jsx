import React, { Fragment } from "react";

import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <Fragment>
      {tasks.map(({ name }) => {
        return <Task name={name} />;
      })}
    </Fragment>
  );
};

export default Tasks;
