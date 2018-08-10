import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Header, Button } from "semantic-ui-react";

import { connect } from "react-redux";

import { showAddProjectModal } from "../../actions/navActions";

const actions = {
  showAddProjectModal
};

class Board extends Component {
  render() {
    const { project, showAddProjectModal } = this.props;

    return (
      <Container fluid className="full-height" style={{ padding: "25px" }}>
        {project && project.projects.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <Header as="h1">You don't have any project.</Header>
            <Button
              content="Add One Now"
              primary
              onClick={showAddProjectModal}
            />
          </div>
        ) : null}

        <Card.Group>
          {project &&
            project.projects.map(project => {
              return (
                <Card as={Link} to={`/projects/${project._id}`}>
                  <Card.Content>
                    <Card.Header>{project.name}</Card.Header>
                    <Card.Description>{project.description}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
        </Card.Group>
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
)(Board);
