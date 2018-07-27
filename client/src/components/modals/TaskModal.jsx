import React, { Component } from "react";
import { Button, Modal, Input, Icon } from "semantic-ui-react";

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
    name: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      const {
        tasks: {
          activeTask: { name }
        }
      } = nextProps;

      this.setState({ name });

      console.log(this.props.tasks);
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { nav, hideTaskModal } = this.props;
    const { name } = this.state;

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
          <Input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={name}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = state => ({
  tasks: state.tasks,
  nav: state.nav
});

export default withRouter(
  connect(
    mapState,
    actions
  )(TaskModal)
);
