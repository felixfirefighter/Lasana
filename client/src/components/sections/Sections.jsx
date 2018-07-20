import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { Header, Button, Input, Icon, Dropdown } from "semantic-ui-react";

import Section from "./Section";
import { addSection } from "../../actions/sectionActions";

const actions = {
  addSection
};

class Sections extends Component {
  state = {
    addNew: false,
    input: ""
  };

  handleAddClick = () => {
    this.setState({ addNew: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  handleAddBlur = async e => {
    const { value } = e.target;
    if (value.trim() !== "") {
      // add new section
      const { projectId } = this.props;
      await this.props.addSection(projectId, { name: value });
    }
    this.setState({ addNew: false });
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === "Enter" && value.trim() !== "") {
      // add new section
      const { projectId } = this.props;
      await this.props.addSection(projectId, { name: value });

      //empty the input field
      this.setState({ input: "" });
    }
  };

  render() {
    const { sections } = this.props;
    const { addNew, input } = this.state;

    return (
      <Fragment>
        {sections.map(({ _id, name }) => {
          return <Section key={_id} id={_id} name={name} />;
        })}

        <div className="section">
          {addNew ? (
            <Input
              autoFocus
              placeholder="New Column"
              value={input}
              onChange={this.handleChange}
              onBlur={this.handleAddBlur}
              onKeyPress={this.handleKeyPress}
            />
          ) : (
            <Button basic onClick={this.handleAddClick}>
              <Icon name="add" /> Add Column
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Sections);
