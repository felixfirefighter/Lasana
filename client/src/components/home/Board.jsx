import React, { Component } from "react";

import { Container, Segment, Header, Loader, Dimmer } from "semantic-ui-react";

import { connect } from "react-redux";

class Board extends Component {
  renderContent = () => {
    const { project } = this.props;

    return Object.keys(project.project).length === 0 ? (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    ) : (
      <div>
        <Segment>
          <Header as="h1" textAlign="center">
            {project.project.name}
          </Header>
        </Segment>
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

export default connect(mapState)(Board);
