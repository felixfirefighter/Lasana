import React, { Component, Fragment } from "react";
import { List, Input } from "semantic-ui-react";

import { connect } from "react-redux";
import classNames from "classnames";

import {
  updateSubtask,
  updateSubtaskStatus
} from "../../actions/subtaskActions";

const actions = {
  updateSubtask,
  updateSubtaskStatus
};

class Subtask extends Component {
  state = {
    active: false,
    input: "",
    loading: false,
    statusLoading: false
  };

  componentDidMount() {
    this.setState({ input: this.props.name });
  }

  handleToggleComplete = async e => {
    e.stopPropagation();
    this.setState({ statusLoading: true });
    await this.props.updateSubtaskStatus(this.props._id);
    this.setState({ statusLoading: false });
  };

  handleClick = () => {
    this.setState({ active: true });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleBlur = async ({ target: { value } }) => {
    if (value.trim() !== "" && value !== this.props.name) {
      return await this.updateSubtask(value);
    }

    this.setState({ active: false });
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === "Enter" && value.trim() !== "" && value !== this.props.name) {
      return await this.updateSubtask(value);
    } else if (key === "Enter" && value === this.props.name) {
      this.setState({ active: false });
    }
  };

  updateSubtask = async value => {
    this.setState({ loading: true });
    await this.props.updateSubtask(this.props._id, { name: value });
    this.setState({ loading: false, active: false });
  };

  render() {
    const { name, isCompleted } = this.props;
    const { active, input, loading, statusLoading } = this.state;

    const iconClass = classNames({
      "complete-icon": true,
      completed: isCompleted
    });

    const icon = statusLoading ? "redo" : "check";

    return (
      <Fragment>
        <List.Item className="subtask" onClick={this.handleClick}>
          <List.Icon
            size="small"
            name={icon}
            circular
            className={iconClass}
            onClick={this.handleToggleComplete}
            loading={statusLoading}
          />

          {active ? (
            <Input
              className="subtask-input"
              size="mini"
              fluid
              autoFocus
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              loading={loading}
              value={input}
            />
          ) : (
            <List.Content>{name}</List.Content>
          )}
        </List.Item>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Subtask);
