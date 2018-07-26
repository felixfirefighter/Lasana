import React, { Component } from "react";
import { Header, Dropdown } from "semantic-ui-react";

import { connect } from "react-redux";

import {
  showUpdateProjectModal,
  showDeleteProjectModal
} from "../../actions/navActions";
import EditProjectModal from "../modals/EditProjectModal";
import DeleteProjectModal from "../modals/DeleteProjectModal";

const actions = {
  showUpdateProjectModal,
  showDeleteProjectModal
};

class ProjectHeader extends Component {
  handleClick = (e, { value }) => {
    if (value === "update") this.props.showUpdateProjectModal();
    if (value === "delete") this.props.showDeleteProjectModal();
  };

  render() {
    const { project } = this.props;

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Header as="h1" textAlign="center" style={{ marginBottom: 0 }}>
            {project.name}
          </Header>
          <Dropdown icon="angle down" style={{ padding: "0 2px" }}>
            <Dropdown.Menu>
              <Dropdown.Item
                value="update"
                text="Edit Name & Description"
                onClick={this.handleClick}
              />
              <Dropdown.Divider />
              <Dropdown.Item
                style={{ color: "red" }}
                value="delete"
                text="Delete Project"
                onClick={this.handleClick}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <EditProjectModal name={project.name} />
        <DeleteProjectModal name={project.name} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ProjectHeader);
