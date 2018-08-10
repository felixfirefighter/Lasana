import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <div
      style={{
        maxHeight: "calc(100vh - 250px)",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      {tasks.map(({ _id, name, isCompleted }) => {
        return (
          <Task _id={_id} name={name} isCompleted={isCompleted} key={_id} />
        );
      })}
    </div>
  );
};

export default Tasks;
