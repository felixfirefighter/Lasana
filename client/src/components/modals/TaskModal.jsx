import React, { Component } from "react";
import { Button, Modal, Form, Label, Icon } from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import { hideTaskModal } from "../../actions/navActions";

const actions = {
  updateTask,
  hideTaskModal
};

class TaskModal extends Component {
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
    const { nav, errors, hideTaskModal } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        open={nav.taskModal}
        onClose={hideTaskModal}
        size="tiny"
        centered={false}
      >
        <Modal.Header>
          <Button basic onClick={this.handleUpdateStatus} style={{ border: 0 }}>
            <Icon name="check" /> Mark Complete
          </Button>
        </Modal.Header>
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
  )(TaskModal)
);
