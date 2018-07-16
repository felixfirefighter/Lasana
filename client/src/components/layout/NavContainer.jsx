import React from "react";
import {
  Sidebar,
  Segment,
  Menu,
  Header,
  Icon,
  Dropdown,
  Button
} from "semantic-ui-react";

import { connect } from "react-redux";

import * as actions from "../../actions/authActions";

const trigger = <Button icon="user" circular />;

const options = [
  { key: "sign-out", text: "Sign Out", icon: "sign out", value: "sign-out" }
];

const PushableSidebar = ({ children, visible, logout }) => {
  this.handleChange = (e, { value }) => {
    if (value === "sign-out") logout();
  };

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        onHide={this.handleSidebarHide}
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item as="a">Home</Menu.Item>
        <Menu.Item as="a">Games</Menu.Item>
        <Menu.Item as="a">Channels</Menu.Item>
      </Sidebar>

      <Menu>
        <Menu.Menu position="right">
          <Dropdown item text="Language">
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Sidebar.Pusher>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default connect(
  null,
  actions
)(PushableSidebar);
