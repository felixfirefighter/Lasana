import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dropdown, Header, Input } from "semantic-ui-react";

import { deleteSection } from "../../actions/sectionActions";

const actions = {
  deleteSection
};

class Section extends Component {
  state = {
    editing: false
  };

  handleClick = (e, { value }) => {
    if (value === "update") this.setState({ editing: true });
    if (value === "delete") this.props.deleteSection(this.props.id);
  };

  handleOnBlur = e => {
    this.setState({ editing: false });
  };

  render() {
    const { editing } = this.state;
    const { name } = this.props;

    return (
      <div className="section">
        {editing ? (
          <Input autoFocus onBlur={this.handleOnBlur} />
        ) : (
          <Fragment>
            <Header as="h3" style={{ marginBottom: 0 }}>
              {name}
            </Header>
            <Dropdown
              style={{ color: "grey", padding: "0 2px" }}
              icon="angle down"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  value="update"
                  text="Rename Column"
                  onClick={this.handleClick}
                />
                <Dropdown.Item
                  value="delete"
                  text="Delete Column"
                  onClick={this.handleClick}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Section);
