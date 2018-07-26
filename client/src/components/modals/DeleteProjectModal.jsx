import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import { hideDeleteProjectModal } from "../../actions/navActions";

const actions = {
  deleteProject,
  hideDeleteProjectModal
};

class DeleteProjectModal extends Component {
  state = {
    loading: false
  };

  handleClick = () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;

    this.props.deleteProject(id);

    //redirect to board
    this.props.history.push("/board");
  };

  render() {
    const { nav, hideDeleteProjectModal, name } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        open={nav.deleteProjectModal}
        onClose={hideDeleteProjectModal}
        size="tiny"
        centered={false}
      >
        <Modal.Header as="h2">Delete "{name}"</Modal.Header>
        <Modal.Content>
          <p>Are you sure? This will permanently delete the project. </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              content="Cancel"
              basic
              onClick={this.hideDeleteProjectModal}
            />
            <Button
              content="Delete Project"
              color="red"
              loading={loading}
              onClick={this.handleClick}
            />
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = state => ({
  nav: state.nav
});

export default withRouter(
  connect(
    mapState,
    actions
  )(DeleteProjectModal)
);
