import React, { Fragment } from "react";

import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <Fragment>
      {tasks.map(({ _id, name, description, dueDate }) => {
        return (
          <Task
            _id={_id}
            name={name}
            description={description}
            dueDate={dueDate}
            key={_id}
          />
        );
      })}
    </Fragment>
  );
};

export default Tasks;
