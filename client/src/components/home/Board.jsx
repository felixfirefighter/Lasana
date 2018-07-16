import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import NavContainer from "../layout/NavContainer";

class Board extends Component {
  render() {
    return (
      <NavContainer visible>
        <Container fluid className="full-height">
          <h1>Hello Board</h1>
        </Container>
      </NavContainer>
    );
  }
}

export default Board;
