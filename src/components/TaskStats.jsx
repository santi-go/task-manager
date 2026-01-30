import React from 'react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  const statsContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  };

  const statCardStyle = {
    padding: '1rem 1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    flex: '1',
    minWidth: '150px',
  };

  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0.5rem 0',
  };

  const statLabelStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <div style={statsContainerStyle}>
      <div style={statCardStyle}>
        <div style={statLabelStyle}>Total Tasks</div>
        <div style={statNumberStyle}>{totalTasks}</div>
      </div>
      <div style={statCardStyle}>
        <div style={statLabelStyle}>Completed</div>
        <div style={{ ...statNumberStyle, color: '#10b981' }}>{completedTasks}</div>
      </div>
      <div style={statCardStyle}>
        <div style={statLabelStyle}>Incomplete</div>
        <div style={{ ...statNumberStyle, color: '#ef4444' }}>{incompleteTasks}</div>
      </div>
    </div>
  );
};

export default TaskStats;
