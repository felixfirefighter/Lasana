import React, { Component } from "react";

import { Header, Button, Input } from "semantic-ui-react";

class Sections extends Component {
  state = {
    addNew: false
  };

  handleAddClick = () => {
    this.setState({ addNew: true });
  };

  handleAddBlur = e => {
    const { value } = e.target;

    if (value.trim() === "") {
      this.setState({ addNew: false });
    } else {
      // add new section
    }
  };

  render() {
    const { sections } = this.props;
    const { addNew } = this.state;

    return (
      <div>
        {sections.map(section => {
          return <Header>{section.name}</Header>;
        })}

        <div className="section">
          {addNew ? (
            <Input
              autoFocus
              placeholder="New Column"
              fluid
              onBlur={this.handleAddBlur}
            />
          ) : (
            <Button content="Add Column" basic onClick={this.handleAddClick} />
          )}
        </div>
      </div>
    );
  }
}

export default Sections;
