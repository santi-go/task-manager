import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import TaskControls from './components/TaskControls';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem('tasks_v1');
    try {
      const parsed = JSON.parse(raw || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = (taskId, newTitle) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  };

  const subtitleStyle = {
    fontSize: '1rem',
    color: '#6b7280',
    margin: 0,
  };

  const headerSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const counterSectionStyle = {
    marginBottom: '2rem',
  };

  const taskListSectionStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'complete') return matchesSearch && t.completed;
    if (statusFilter === 'incomplete') return matchesSearch && !t.completed;
    return matchesSearch;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage:', e);
    }
  }, [tasks]);

  return (
    <div style={appContainerStyle} className="app-root">
      <div className="left-column">
        <div className="header-section" style={headerSectionStyle}>
          <header style={headerStyle}>
            <h1 style={titleStyle}>📋 Task Manager</h1>
            <p style={subtitleStyle}>Organize and track your daily tasks</p>
          </header>
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="counter-section" style={counterSectionStyle}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TaskStats tasks={filteredTasks} />
            <TaskControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        </div>
      </div>

      <div className="right-column">
        <div className="task-list-section" style={taskListSectionStyle}>
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
