import React from "react";

import { Menu } from "semantic-ui-react";

import { connect } from "react-redux";

import { getProject } from "../../actions/projectActions";

const actions = {
  getProject
};

const NavProjectListItem = ({ projects, getProject }) => {
  this.handleClick = id => {
    getProject(id);
  };

  return (
    <Menu.Menu>
      {projects.map(project => {
        const { _id, name } = project;

        return (
          <Menu.Item
            key={_id}
            style={{ textAlign: "left" }}
            onClick={() => this.handleClick(_id)}
          >
            {name}
          </Menu.Item>
        );
      })}
    </Menu.Menu>
  );
};

export default connect(
  null,
  actions
)(NavProjectListItem);
