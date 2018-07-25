import React, { Fragment } from "react";

import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <Fragment>
      {tasks.map(({ _id, name }) => {
        return <Task name={name} key={_id} />;
      })}
    </Fragment>
  );
};

export default Tasks;
