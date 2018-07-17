import React from "react";

import { Menu } from "semantic-ui-react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProject } from "../../actions/projectActions";

const actions = {
  getProject
};

const NavProjectListItem = ({ projects, getProject }) => {
  return (
    <Menu.Menu>
      {projects.map(project => {
        const { _id, name } = project;

        return (
          <Menu.Item
            as={Link}
            key={_id}
            to={`/projects/${_id}`}
            style={{ textAlign: "left" }}
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
