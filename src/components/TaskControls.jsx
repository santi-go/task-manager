import React from 'react';

const TaskControls = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) => {
  const containerStyle = {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  };

  const inputStyle = {
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    minWidth: '180px',
  };

  const selectStyle = {
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
  };

  return (
    <div style={containerStyle}>
      <input
        type="search"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={inputStyle}
        aria-label="Search tasks"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={selectStyle}
        aria-label="Filter by status"
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default TaskControls;
