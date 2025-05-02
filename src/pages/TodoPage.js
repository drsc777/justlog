import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';
import '../styles/TodoPage.css';

const TodoPage = () => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');

  // Load todos - would fetch from API in a real app
  useEffect(() => {
    // Simulating API call with local data
    const mockTodos = [
      { id: 1, text: 'Read a book', completed: false, priority: 'high', deadline: '2024-04-23' },
      { id: 2, text: 'Exercise', completed: true, priority: 'medium', deadline: '2024-04-21' }
    ];
    
    setTodos(mockTodos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      priority,
      deadline: deadline || null
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
    setPriority('medium');
    setDeadline('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <Layout>
      <div className="todo-container">
        <div className="todo-header">
          <h1>To-Do List</h1>
        </div>
        
        <div className="todo-content">
          <form onSubmit={handleSubmit} className="todo-form pixel-border">
            <div className="form-group">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="todo-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Priority:</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="priority-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Deadline (optional):</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <button type="submit" className="btn add-btn">Add Task</button>
          </form>
          
          <div className="todo-list pixel-border">
            <h2>Tasks</h2>
            
            {todos.length === 0 ? (
              <p className="no-todos">No tasks yet. Add one above!</p>
            ) : (
              <div className="todos">
                {todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  >
                    <div className="todo-item-main">
                      <label className="todo-checkbox">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      
                      <div className="todo-text">
                        <span className={todo.completed ? 'strike-through' : ''}>
                          {todo.text}
                        </span>
                        
                        <div className="todo-meta">
                          <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                            {todo.priority}
                          </span>
                          
                          {todo.deadline && (
                            <span className="deadline">
                              Due: {new Date(todo.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteTodo(todo.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TodoPage; 