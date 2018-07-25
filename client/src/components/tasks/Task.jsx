import React, { Component } from "react";

import { Card } from "semantic-ui-react";

class Task extends Component {
  render() {
    const { name } = this.props;

    return (
      <Card style={{ height: "80px" }}>
        <Card.Content>{name}</Card.Content>
      </Card>
    );
  }
}

export default Task;
