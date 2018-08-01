import React, { Fragment } from "react";

import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <Fragment>
      {tasks.map(
        ({ _id, name, description, dueDate, isCompleted, subtasks }) => {
          return (
            <Task
              _id={_id}
              name={name}
              description={description}
              dueDate={dueDate}
              isCompleted={isCompleted}
              subtasks={subtasks}
              key={_id}
            />
          );
        }
      )}
    </Fragment>
  );
};

export default Tasks;
