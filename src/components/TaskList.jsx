import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }) => {
  const emptyStateStyle = {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#9ca3af',
    fontSize: '1.125rem',
  };

  const listContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  if (tasks.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <p>✨ No tasks yet! Add one to get started.</p>
      </div>
    );
  }

  return (
    <div style={listContainerStyle}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
