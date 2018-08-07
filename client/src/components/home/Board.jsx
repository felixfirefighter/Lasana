import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

import { connect } from "react-redux";

class Board extends Component {
  render() {
    const { project } = this.props;

    return (
      <Container fluid className="full-height" style={{ padding: "25px" }}>
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

export default connect(mapState)(Board);
