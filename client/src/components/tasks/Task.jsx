import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Dropdown, Icon } from "semantic-ui-react";

import { showTaskModal } from "../../actions/navActions";
import { deleteTask } from "../../actions/taskActions";

const actions = {
  showTaskModal,
  deleteTask
};

class Task extends Component {
  handleClick = () => {
    const {
      showTaskModal,
      _id,
      name,
      description,
      dueDate,
      isCompleted,
      subtasks
    } = this.props;

    showTaskModal({ _id, name, description, dueDate, isCompleted, subtasks });
  };

  handleDropdownClick = (e, { value }) => {
    const { deleteTask, _id } = this.props;

    if (value === "delete") deleteTask(_id);
  };

  render() {
    const { name, isCompleted } = this.props;

    const style = isCompleted ? { opacity: ".25" } : null;

    return (
      <Fragment>
        <Card
          style={{ ...{ height: "80px", color: "#000" }, ...style }}
          onClick={this.handleClick}
        >
          <Card.Content>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {isCompleted ? (
                  <Icon
                    circular
                    inverted
                    color="green"
                    size="tiny"
                    name="check"
                  />
                ) : null}
                {name}
              </div>
              <Dropdown icon="angle down" style={{ padding: "0 2px" }}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    value="delete"
                    text="Delete"
                    onClick={this.handleDropdownClick}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Content>
        </Card>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Task);
