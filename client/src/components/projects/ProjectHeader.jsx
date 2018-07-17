import React, { Component } from "react";
import { Segment, Header, Dropdown } from "semantic-ui-react";

import EditProjectModal from "../modals/EditProjectModal";

class ProjectHeader extends Component {
  handleClick = (e, { value }) => {};

  render() {
    const { project } = this.props;

    return (
      <div>
        <Segment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Header as="h1" textAlign="center" style={{ marginBottom: 0 }}>
              {project.name}
            </Header>
            <Dropdown icon="angle down">
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
        </Segment>
        <EditProjectModal name={project.name} />
      </div>
    );
  }
}

export default ProjectHeader;
