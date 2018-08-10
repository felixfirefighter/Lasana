import React, { Component, Fragment } from "react";

import {
  Container,
  Segment,
  Loader,
  Dimmer,
  Divider,
  Sidebar,
  Card
} from "semantic-ui-react";

import { connect } from "react-redux";

import { getProject } from "../../actions/projectActions";

import ProjectHeader from "./ProjectHeader";
import Sections from "../sections/Sections";
import TaskModal from "../modals/TaskModal";

const actions = {
  getProject
};

class Project extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getProject(nextProps.match.params.id);
    }
  }

  handleClick = () => {
    this.setState(prev => ({ visible: !prev.visible }));
  };

  renderContent = () => {
    const {
      project,
      match: {
        params: { id }
      }
    } = this.props;

    const { visible } = this.state;

    return Object.keys(project.project).length === 0 ? (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    ) : (
      <Fragment>
        <Segment basic style={{ margin: 0, padding: 0 }}>
          <ProjectHeader project={project.project} />
          <Divider style={{ marginBottom: "0" }} />
        </Segment>

        <Segment
          basic
          style={{
            flex: "1",
            overflow: "auto",
            margin: 0,
            backgroundColor: "#fafafa"
          }}
        >
          <Sidebar.Pushable>
            <Sidebar
              animation="push"
              icon="labeled"
              inverted
              vertical
              visible={visible}
              width="wide"
              style={{ paddingRight: "14px" }}
            >
              <Card fluid>
                <Card.Content>
                  <p className="text-small">Description</p>
                  <p>{project.project.description}</p>
                </Card.Content>
              </Card>
            </Sidebar>
            <Sidebar.Pusher style={{ marginLeft: "2rem" }}>
              <a className="button-text" onClick={this.handleClick}>
                {visible
                  ? "Hide Project Description"
                  : "Show Project Description"}
              </a>
              <div className="sections">
                <Sections projectId={id} sections={project.project.sections} />
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Segment>
      </Fragment>
    );
  };

  render() {
    return (
      <Container
        fluid
        style={{ flex: "1", display: "flex", flexDirection: "column" }}
      >
        {this.renderContent()}
        <TaskModal />
      </Container>
    );
  }
}

const mapState = state => ({
  project: state.project
});

export default connect(
  mapState,
  actions
)(Project);
