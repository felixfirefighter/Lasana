import React, { Component } from "react";

import {
  Container,
  Segment,
  Header,
  Loader,
  Dimmer,
  Button,
  Icon,
  Dropdown
} from "semantic-ui-react";

import { connect } from "react-redux";

import { getProject } from "../../actions/projectActions";

import ProjectHeader from "./ProjectHeader";
import Sections from "../sections/Sections";

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
    const { project } = this.props;

    return Object.keys(project.project).length === 0 ? (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    ) : (
      <div>
        <ProjectHeader project={project.project} />
        <div className="sections">
          <Sections sections={project.project.sections} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <Container fluid className="full-height">
        {this.renderContent()}
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
