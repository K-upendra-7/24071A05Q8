function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className="todo-item">
          <div className="todo-content" onClick={() => onToggle(todo._id, todo.completed)}>
            <input 
              type="checkbox" 
              className="checkbox"
              checked={todo.completed} 
              readOnly 
            />
            <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </span>
          </div>
          <button 
            className="btn-delete" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo._id);
            }}
            aria-label="Delete"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
