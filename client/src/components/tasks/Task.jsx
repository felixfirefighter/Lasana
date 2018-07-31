import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Dropdown } from "semantic-ui-react";

import { showTaskModal } from "../../actions/navActions";
import { deleteTask } from "../../actions/taskActions";

const actions = {
  showTaskModal,
  deleteTask
};

class Task extends Component {
  handleClick = () => {
    const { showTaskModal, _id, name, description, dueDate } = this.props;

    showTaskModal({ _id, name, description, dueDate });
  };

  handleClick = (e, { value }) => {
    const { deleteTask, _id } = this.props;

    if (value === "delete") deleteTask(_id);
  };

  render() {
    const { name } = this.props;

    return (
      <Fragment>
        <Card
          style={{ height: "80px", color: "#000" }}
          onClick={this.handleClick}
        >
          <Card.Content>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{name}</span>
              <Dropdown icon="angle down" style={{ padding: "0 2px" }}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    value="delete"
                    text="Delete"
                    onClick={this.handleClick}
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
