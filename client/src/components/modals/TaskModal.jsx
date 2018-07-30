import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Divider,
  TextArea
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { connect } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import { hideTaskModal } from "../../actions/navActions";

const actions = {
  updateTask,
  hideTaskModal
};

class TaskModal extends Component {
  state = {
    _id: "",
    name: "",
    dueDate: undefined,
    description: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      const {
        tasks: {
          activeTask: { _id, name, description, dueDate }
        }
      } = nextProps;

      this.setState({ _id, name, description, dueDate });
    }
  }

  handleClick = e => {
    console.log(e.target, e);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleDayChange = day => {
    this.props.updateTask(this.state._id, { dueDate: day });
  };

  handleBlur = ({ target: { name } }) => {
    this.props.updateTask(this.state._id, { [name]: this.state[name] });
  };

  render() {
    const { nav, hideTaskModal } = this.props;
    const { name, dueDate, description } = this.state;

    return (
      <Modal
        open={nav.taskModal}
        onClose={hideTaskModal}
        size="tiny"
        centered={false}
      >
        <Modal.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button basic onClick={this.handleUpdateStatus} style={{ border: 0 }}>
            <Icon name="check" /> Mark Complete
          </Button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              size="small"
              name="close"
              className="pointer"
              color="grey"
              onClick={hideTaskModal}
            />
          </div>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                name="name"
                type="text"
                fluid
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={name}
                size="big"
                placeholder="Write a task name"
                style={{ marginBottom: "10px" }}
              />
            </Form.Field>

            <Form.Field>
              <label>Due Date</label>
              <DayPickerInput
                placeholder="Due Date"
                value={dueDate}
                onDayChange={this.handleDayChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <TextArea
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={description}
                style={{ flex: "1" }}
              />
            </Form.Field>
          </Form>
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
