import React, { Component, Fragment } from "react";
import { List, Input } from "semantic-ui-react";

class Subtask extends Component {
  state = {
    active: false
  };

  handleClick = () => {
    this.setState({ active: true });
  };

  handleBlur = () => {
    // this.setState({ active: false });
  };

  render() {
    const { name } = this.props;
    const { active } = this.state;

    return (
      <Fragment>
        <List.Item className="subtask" onClick={this.handleClick}>
          <List.Icon
            size="small"
            name="check"
            circular
            className="complete-icon"
          />

          {active ? (
            <Input
              className="subtask-input"
              size="mini"
              fluid
              autoFocus
              onBlur={this.handleBlur}
            />
          ) : (
            <List.Content>name</List.Content>
          )}
        </List.Item>
      </Fragment>
    );
  }
}

export default Subtask;
