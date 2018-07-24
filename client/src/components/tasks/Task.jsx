import React, { Component } from "react";

class Task extends Component {
  render() {
    const { name } = this.props;

    return <h1>{name}</h1>;
  }
}

export default Task;
