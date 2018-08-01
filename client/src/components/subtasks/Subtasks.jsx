import React, { Component } from "react";

import { List, Input } from "semantic-ui-react";

import Subtask from "./Subtask";

class Subtasks extends Component {
  state = {
    input: ""
  };

  handleBlur = ({ target: { value } }) => {
    if (value.trim() !== "") {
      // add new section
    }
    this.props.toggleSubtaskInput();
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === "Enter" && value.trim() !== "") {
      // add new section
      //empty the input field
      this.setState({ input: "" });
    }
  };

  render() {
    const { showSubtaskInput, subtasks } = this.props;

    return (
      <List relaxed celled verticalAlign="middle">
        {subtasks &&
          subtasks.map(({ name }) => {
            return <Subtask />;
          })}
        {showSubtaskInput ? (
          <Input
            autoFocus
            size="mini"
            fluid
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
          />
        ) : null}
      </List>
    );
  }
}

export default Subtasks;
