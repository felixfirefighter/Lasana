import React, { Component } from "react";

import { Container, Segment, Header } from "semantic-ui-react";

class Board extends Component {
  render() {
    return (
      <Container fluid className="full-height">
        <Segment>
          <Header as="h1" textAlign="center">
            Projects
          </Header>
        </Segment>
        <h1>Hello Board</h1>
      </Container>
    );
  }
}

export default Board;
