import React, { Component } from "react";

import { List, Input } from "semantic-ui-react";

import { connect } from "react-redux";

import { addSubtask } from "../../actions/subtaskActions";

import Subtask from "./Subtask";

const actions = {
  addSubtask
};

class Subtasks extends Component {
  state = {
    input: "",
    loading: false
  };

  handleBlur = async ({ target: { value } }) => {
    if (value.trim() !== "") {
      // add new subtask
      await this.addSubtask(value);
    }
    this.props.toggleSubtaskInput();
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === "Enter" && value.trim() !== "") {
      // add new subtask
      //empty the input field
      await this.addSubtask(value);
      this.setState({ input: "" });
    }
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  addSubtask = async value => {
    this.setState({ loading: true });
    await this.props.addSubtask(this.props.taskId, { name: value });
    this.setState({ loading: false });
  };

  render() {
    const { showSubtaskInput, subtasks } = this.props;
    const { loading, input } = this.state;

    return (
      <List relaxed celled verticalAlign="middle">
        {subtasks &&
          subtasks.map(({ _id, name, isCompleted }) => {
            return (
              <Subtask
                name={name}
                _id={_id}
                key={_id}
                isCompleted={isCompleted}
              />
            );
          })}
        {showSubtaskInput ? (
          <Input
            autoFocus
            size="mini"
            fluid
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            loading={loading}
            value={input}
          />
        ) : null}
      </List>
    );
  }
}

export default connect(
  null,
  actions
)(Subtasks);
