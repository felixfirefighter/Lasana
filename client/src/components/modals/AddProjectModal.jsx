import React, { Component } from "react";
import { Button, Header, Image, Modal, Form, Label } from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { addProject } from "../../actions/projectActions";
import { hideAddProjectModal } from "../../actions/navActions";

const actions = {
  addProject,
  hideAddProjectModal
};

class AddProjectModal extends Component {
  state = {
    name: "",
    description: "",
    loading: false,
    errors: {}
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ loading: true });

    const { name, description } = this.state;
    this.props.addProject({ name, description }, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    }
  }

  render() {
    const { nav, errors, hideAddProjectModal } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        open={nav.addProjectModal}
        onClose={hideAddProjectModal}
        size="tiny"
        centered={false}
      >
        <Modal.Header as="h2">New Project</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="Project Name"
              name="name"
              type="text"
              onChange={this.handleChange}
              error={errors.name != null}
            />
            {errors.name != null && <Label content={errors.name} color="red" />}
            <Form.TextArea
              label="Description"
              name="description"
              onChange={this.handleChange}
            />

            <Form.Field style={{ textAlign: "right" }}>
              <Button content="Create Project" primary loading={loading} />
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = state => ({
  errors: state.errors,
  nav: state.nav
});

export default withRouter(
  connect(
    mapState,
    actions
  )(AddProjectModal)
);
