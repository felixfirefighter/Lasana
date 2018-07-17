import React, { Component } from "react";
import { Button, Modal, Form, Label } from "semantic-ui-react";

import { connect } from "react-redux";
import { updateProject } from "../../actions/projectActions";
import { hideUpdateProjectModal } from "../../actions/navActions";

const actions = {
  updateProject,
  hideUpdateProjectModal
};

class EditProjectModal extends Component {
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
    this.props.addProject({ name, description });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    }
  }

  render() {
    const { nav, errors, hideUpdateProjectModal, name } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        open={nav.updateProjectModal}
        onClose={hideUpdateProjectModal}
        size="tiny"
        centered={false}
      >
        <Modal.Header as="h2">Edit {name}</Modal.Header>
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
              <Button content="Update Project" primary loading={loading} />
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

export default connect(
  mapState,
  actions
)(EditProjectModal);
