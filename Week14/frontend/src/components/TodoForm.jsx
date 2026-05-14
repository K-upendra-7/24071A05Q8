import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onAdd(title);
    setTitle('');
    setIsSubmitting(false);
  };

  return (
    <div className="form-wrapper">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          autoFocus
        />
        <button type="submit" className="btn-submit" disabled={isSubmitting || !title.trim()}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
