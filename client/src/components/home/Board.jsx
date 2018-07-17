import React, { Component } from "react";

import { Container } from "semantic-ui-react";

import { connect } from "react-redux";

class Board extends Component {
  render() {
    return (
      <Container fluid className="full-height">
        <h1>Main Board</h1>
      </Container>
    );
  }
}

const mapState = state => ({
  project: state.project
});

export default connect(mapState)(Board);
