import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Dropdown, Icon } from 'semantic-ui-react';

import { showTaskModal } from '../../actions/navActions';
import { getTask, deleteTask } from '../../actions/taskActions';

const actions = {
  getTask,
  showTaskModal,
  deleteTask
};

class Task extends Component {
  handleClick = () => {
    const { getTask, showTaskModal, _id } = this.props;

    showTaskModal();
    getTask(_id);
  };

  handleDropdownClick = (e, { value }) => {
    const { selectTask, deleteTask, _id, changeColor } = this.props;

    if (value === 'delete') deleteTask(_id);
    if (value === 'select') selectTask(_id);
    if (value === 'changeColor') changeColor();
  };

  render() {
    const {
      name,
      isCompleted,
      selectedTaskId,
      _id,
      style,
      changedCount,
      sectionCount
    } = this.props;

    const completedStyle = isCompleted ? { opacity: '.25' } : null;
    const selectedStyle =
      selectedTaskId === _id ? { border: '1px solid #2ecc40' } : null;

    return (
      <Fragment>
        <Card
          style={{
            ...style,
            ...{ height: '80px', color: '#000', boxShadow: 'none' },
            ...completedStyle,
            ...selectedStyle
          }}
          onClick={this.handleClick}
        >
          <Card.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isCompleted ? (
                  <Icon
                    circular
                    inverted
                    color="green"
                    size="tiny"
                    name="check"
                  />
                ) : null}
                {name}
              </div>
              <Dropdown
                icon="angle down"
                style={{ padding: '0 2px' }}
                direction="left"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    value="delete"
                    text="Delete"
                    onClick={this.handleDropdownClick}
                  />
                  <Dropdown.Item
                    value="select"
                    text="Set as active"
                    onClick={this.handleDropdownClick}
                  />
                  <Dropdown.Item
                    value="changeColor"
                    text="Change Color"
                    onClick={this.handleDropdownClick}
                  />

                  <Dropdown.Item text={`Count: ${changedCount}`} />
                  <Dropdown.Item text={`Column: ${sectionCount}`} />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Content>
        </Card>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(Task);
