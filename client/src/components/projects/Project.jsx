import React, { Component, Fragment } from "react";

import { Container, Segment, Loader, Dimmer, Divider } from "semantic-ui-react";

import { connect } from "react-redux";

import { getProject } from "../../actions/projectActions";

import ProjectHeader from "./ProjectHeader";
import Sections from "../sections/Sections";
import TaskModal from "../modals/TaskModal";

const actions = {
  getProject
};

class Project extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getProject(nextProps.match.params.id);
    }
  }

  renderContent = () => {
    const {
      project,
      match: {
        params: { id }
      }
    } = this.props;

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
          <div className="sections">
            <Sections projectId={id} sections={project.project.sections} />
          </div>
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
