import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { Button, Input, Icon } from 'semantic-ui-react';

import Section from './Section';
import { addSection } from '../../actions/sectionActions';

const actions = {
  addSection
};

class Sections extends Component {
  state = {
    addNew: false,
    input: '',
    loading: false,
    selectedTaskId: null,
    changedTasks: []
  };

  addNewSection = async value => {
    const { projectId } = this.props;
    this.setState({ loading: true });
    await this.props.addSection(projectId, { name: value });
    this.setState({ loading: false });
  };

  handleAddClick = () => {
    this.setState({ addNew: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  handleAddBlur = ({ target: { value } }) => {
    if (value.trim() !== '') {
      // add new section
      this.addNewSection(value);
    }
    this.setState({ addNew: false });
  };

  handleKeyPress = async ({ key, target: { value } }) => {
    if (key === 'Enter' && value.trim() !== '') {
      // add new section
      await this.addNewSection(value);
      //empty the input field
      this.setState({ input: '' });
    }
  };

  selectTask = _id => {
    this.setState({ selectedTaskId: _id });
  };

  changeColor = () => {
    if (this.state.changedTasks.indexOf(this.state.selectedTaskId) === -1) {
      this.setState({
        changedTasks: [...this.state.changedTasks, this.state.selectedTaskId]
      });
    }
  };

  render() {
    const { sections } = this.props;
    const { addNew, input, loading, selectedTaskId, changedTasks } = this.state;

    return (
      <Fragment>
        {sections.map(({ _id, name, tasks }) => {
          return (
            <Section
              key={_id}
              id={_id}
              name={name}
              tasks={tasks}
              selectTask={this.selectTask}
              selectedTaskId={selectedTaskId}
              changedTasks={changedTasks}
              changeColor={this.changeColor}
              sectionCount={sections.length}
            />
          );
        })}

        <div className="section" style={{ alignSelf: 'flex-start' }}>
          {addNew ? (
            <Input
              autoFocus
              loading={loading}
              placeholder="New Column"
              value={input}
              onChange={this.handleChange}
              onBlur={this.handleAddBlur}
              onKeyPress={this.handleKeyPress}
            />
          ) : (
            <div>
              <Button basic onClick={this.handleAddClick} style={{ border: 0 }}>
                <Icon name="add" /> Add Column
              </Button>
            </div>
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
