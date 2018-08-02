import React from "react";
import { List } from "semantic-ui-react";

const Subtask = ({ name }) => {
  return (
    <List.Item>
      <List.Icon size="small" name="check" circular className="pointer" />
      <List.Content>{name}</List.Content>
    </List.Item>
  );
};

export default Subtask;
