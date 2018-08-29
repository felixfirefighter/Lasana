import React, { Fragment } from 'react';
import { Card } from 'semantic-ui-react';
import Task from './Task';

const Tasks = ({
  tasks,
  selectTask,
  selectedTaskId,
  changeColor,
  changedTasks,
  sectionCount
}) => {
  return (
    <div
      style={{
        maxHeight: 'calc(100vh - 250px)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {tasks.map(({ _id, name, isCompleted }) => {
        const backgroundColor =
          changedTasks.indexOf(_id) !== -1
            ? { backgroundColor: '#f2711c' }
            : null;
        return (
          <Task
            _id={_id}
            name={name}
            isCompleted={isCompleted}
            key={_id}
            selectTask={selectTask}
            selectedTaskId={selectedTaskId}
            changeColor={changeColor}
            changedCount={changedTasks.length}
            sectionCount={sectionCount}
            style={backgroundColor}
          />
        );
      })}
    </div>
  );
};

export default Tasks;
