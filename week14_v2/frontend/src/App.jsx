import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/todos';

  useEffect(() => {
    fetchTodos();
  },[]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch todos. Is the backend running?');
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([response.data, ...todos]);
      try {
        await axios.post('http://localhost:5000/send-email', { task: title });
      } catch (emailErr) {
        console.error('Error triggering email notification:', emailErr);
      }
    } catch (err) {
      console.error('Error adding todo:', err);
      alert('Failed to add todo');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RemindMe.</h1>
        <p>Your beautiful modern day planner, with instant email alerts.</p>
      </header>

      <main className="app-main">
        <TodoForm onAdd={addTodo} />
        
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <TodoList 
            todos={todos} 
            onToggle={toggleComplete} 
            onDelete={deleteTodo} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
