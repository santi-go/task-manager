import { useState, useEffect } from 'react';
const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setEditTitle(task.title);
  }, [task.title]);
  const priorityColors = {
    high: '#dc2626',
    medium: '#ca8a04',
    low: '#16a34a',
  };

  const priorityColor = priorityColors[task.priority] || '#6b7280';

  const taskItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '0.75rem',
    border: `2px solid ${priorityColor}`,
    borderRadius: '8px',
    backgroundColor: isHovered ? (task.completed ? '#e5e7eb' : '#f9fafb') : (task.completed ? '#f3f4f6' : '#ffffff'),
    opacity: task.completed ? 0.7 : 1,
    transition: 'all 0.2s ease',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.06)',
    cursor: 'default',
  };

  const titleStyle = {
    flex: 1,
    textDecoration: task.completed ? 'line-through' : 'none',
     color: task.completed ? '#6b7280' : priorityColor,
    fontSize: '1rem',
    fontWeight: task.completed ? 'normal' : '500',
  };


  const buttonContainerStyle = {
    display: 'flex',
     gap: '0.75rem',
    marginLeft: '1rem',
     alignItems: 'center',
  };

    const checkboxStyle = {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      accentColor: priorityColor,
    };

  const deleteButtonStyle = {
      padding: '0.25rem 0.5rem',
      fontSize: '1.25rem',
      lineHeight: '1',
      border: 'none',
      background: 'none',
      color: isLoading ? '#9ca3af' : '#ef4444',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24px',
      opacity: isLoading ? 0.5 : (isHovered ? 1 : 0.7),
  };

  return (
    <div
      style={taskItemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={() => {
              const trimmed = editTitle.trim();
              if (trimmed && trimmed !== task.title) {
                onEditTask?.(task.id, trimmed);
              }
              setIsEditing(false);
              setEditTitle(task.title);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const trimmed = editTitle.trim();
                if (trimmed && trimmed !== task.title) {
                  onEditTask?.(task.id, trimmed);
                }
                setIsEditing(false);
                setEditTitle(task.title);
              }
              if (e.key === 'Escape') {
                setEditTitle(task.title);
                setIsEditing(false);
              }
            }}
            autoFocus
            style={{ ...titleStyle, border: '1px solid #d1d5db', padding: '0.5rem', borderRadius: '6px' }}
          />
        ) : (
          <span style={titleStyle} onClick={() => setIsEditing(true)}>{task.title}</span>
        )}
      </div>
      <div style={buttonContainerStyle}>
         <input
           type="checkbox"
           checked={task.completed}
           onChange={() => onToggleComplete(task.id)}
           style={checkboxStyle}
           aria-label="Toggle task completion"
         />
        <button
          style={deleteButtonStyle}
          onClick={() => onDeleteTask(task.id)}
          onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
          aria-label="Delete task"
          disabled={isLoading}
        >
          {isLoading ? '⏳' : '✕'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
