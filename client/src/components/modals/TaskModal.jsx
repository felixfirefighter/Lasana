import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Divider,
  Popup,
  TextArea
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { connect } from "react-redux";
import { updateTask, updateTaskStatus } from "../../actions/taskActions";
import { hideTaskModal } from "../../actions/navActions";

import Subtasks from "../subtasks/Subtasks";

const actions = {
  updateTask,
  updateTaskStatus,
  hideTaskModal
};

class TaskModal extends Component {
  state = {
    _id: "",
    name: "",
    dueDate: undefined,
    description: "",
    isCompleted: false,
    loading: false,
    showSubtaskInput: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      const {
        tasks: {
          activeTask: { _id, name, description, dueDate, isCompleted }
        }
      } = nextProps;

      this.setState({ _id, name, description, dueDate, isCompleted });
    }
  }

  toggleSubtaskInput = () => {
    this.setState(prevState => ({
      showSubtaskInput: !prevState.showSubtaskInput
    }));
  };

  handleUpdateStatus = async () => {
    this.setState({ loading: true });
    await this.props.updateTaskStatus(this.state._id);
    this.setState({ loading: false });
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
    const {
      nav,
      hideTaskModal,
      tasks: {
        activeTask: { subtasks }
      }
    } = this.props;
    const {
      name,
      dueDate,
      description,
      isCompleted,
      loading,
      showSubtaskInput
    } = this.state;

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
          {isCompleted ? (
            <Button
              positive
              onClick={this.handleUpdateStatus}
              style={{ border: 0 }}
              loading={loading}
            >
              <Icon name="check" />
              Completed
            </Button>
          ) : (
            <Button
              basic
              onClick={this.handleUpdateStatus}
              style={{ border: 0 }}
              loading={loading}
            >
              <Icon name="check" /> Mark Complete
            </Button>
          )}

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button.Group basic size="tiny">
              <Popup
                trigger={
                  <Button icon="list" onClick={this.toggleSubtaskInput} />
                }
                content="Add subtask"
              />
              <Popup
                trigger={<Button icon="close" onClick={hideTaskModal} />}
                content="Close"
              />
            </Button.Group>
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

          <Subtasks
            showSubtaskInput={showSubtaskInput}
            subtasks={subtasks}
            toggleSubtaskInput={this.toggleSubtaskInput}
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
