import React, { Component } from "react";
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

import { logout } from "../../actions/authActions";
import { getProjects } from "../../actions/projectActions";
import { showAddProjectModal } from "../../actions/navActions";

import AddProjectModal from "../modals/AddProjectModal";
import NavProjectListItem from "./NavProjectListItem";

const actions = {
  logout,
  getProjects,
  showAddProjectModal
};

class PushableSidebar extends Component {
  state = {
    sidebar: true
  };

  componentDidMount() {
    this.props.getProjects();
  }

  show = name => () => {
    this.setState({ [name]: true });
  };

  close = name => () => {
    this.setState({ [name]: false });
  };

  handleClick = (e, { value }) => {
    if (value === "signOut") return this.props.logout();
  };

  render() {
    const { auth, children, showAddProjectModal, project } = this.props;

    return (
      <div className="full-height">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            icon="labeled"
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.sidebar}
            width="wide"
          >
            <Menu.Item>
              <div className="space-between">
                <Header as="h2" inverted className="m-0">
                  Lasana
                </Header>
                <Icon
                  className="pointer"
                  name="close"
                  onClick={this.close("sidebar")}
                />
              </div>
            </Menu.Item>

            <Menu.Item>
              <div className="space-between">
                <p className="m-0">Projects</p>
                <Button
                  size="mini"
                  compact
                  icon="add"
                  circular
                  inverted
                  onClick={showAddProjectModal}
                />
              </div>
              {project.projects && (
                <NavProjectListItem projects={project.projects} />
              )}
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher style={{ display: "flex", flexDirection: "column" }}>
            <Menu style={{ margin: "0" }}>
              {!this.state.sidebar && (
                <Menu.Menu>
                  <Menu.Item icon="bars" onClick={this.show("sidebar")} />
                </Menu.Menu>
              )}
              <Menu.Menu position="right">
                <Dropdown item text={auth.user.email}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      value="signOut"
                      icon="log out"
                      text="Sign Out"
                      onClick={this.handleClick}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Menu>
            <Segment
              basic
              style={{
                padding: 0,
                flex: "1",
                display: "flex"
              }}
            >
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <AddProjectModal />
      </div>
    );
  }
}

const mapState = state => ({
  auth: state.auth,
  project: state.project
});

export default connect(
  mapState,
  actions
)(PushableSidebar);
