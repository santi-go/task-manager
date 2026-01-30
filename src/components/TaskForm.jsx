import React, { useState } from 'react';

const TaskForm = ({ onAddTask, isLoading }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        id: Date.now() + Math.random(),
        title: title.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setPriority('medium');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0',
    backgroundColor: 'transparent',
    borderRadius: '0',
    border: 'none',
    marginBottom: '0',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  };

  const inputStyle = {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #d1d5db',
    borderRadius: '4px',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.75rem',
  };

  const submitButtonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
    border: 'none',
    borderRadius: '4px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    flex: 1,
    opacity: isLoading ? 0.6 : 1,
  };

  const resetButtonStyle = {
    ...submitButtonStyle,
    backgroundColor: '#9ca3af',
    flex: 0.5,
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={inputGroupStyle}>
        <label style={labelStyle} htmlFor="taskTitle">
          Task Title
        </label>
        <input
          id="taskTitle"
          style={inputStyle}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          required
          minLength={3}
          maxLength={100}
          disabled={isLoading}
          onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
      </div>

      <div style={inputGroupStyle}>
        <label style={labelStyle} htmlFor="priority">
          Priority
        </label>
        <select
          id="priority"
          style={selectStyle}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={buttonContainerStyle}>
        <button
          style={submitButtonStyle}
          type="submit"
          disabled={isLoading}
          onMouseEnter={(e) => !isLoading && (e.target.style.opacity = '0.85')}
          onMouseLeave={(e) => !isLoading && (e.target.style.opacity = '1')}
        >
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
        <button
          style={resetButtonStyle}
          type="reset"
          disabled={isLoading}
          onClick={() => {
            setTitle('');
            setPriority('medium');
          }}
          onMouseEnter={(e) => !isLoading && (e.target.style.opacity = '0.85')}
          onMouseLeave={(e) => !isLoading && (e.target.style.opacity = '1')}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
