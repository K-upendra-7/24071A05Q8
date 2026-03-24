import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/todos";

export default function TodoManager() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  async function addOrUpdateTodo() {
    if (task.trim() === "") return;

    try {
      if (editId !== null) {
        // UPDATE
        const res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: task }),
        });
        const updatedTodo = await res.json();
        setTodos(todos.map((t) => (t.id === editId ? updatedTodo : t)));
        setEditId(null);
      } else {
        // CREATE
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: task }),
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
      }
      setTask("");
    } catch (error) {
      console.error("Failed to add or update todo", error);
    }
  }

  async function toggleTodo(id, currentDone) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !currentDone }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }

  function editTodo(todo) {
    setTask(todo.text);
    setEditId(todo.id);
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Todo Manager</h2>

        <div className="inputRow">
          <input
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addOrUpdateTodo()}
            placeholder="What needs to be done?"
            autoFocus
          />
          <button className="addBtn" onClick={addOrUpdateTodo}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="list">
          {todos.length === 0 && <p className="emptyState">No tasks yet. Add one!</p>}

          {todos.map((t) => (
            <li key={t.id} className="listItem">
              <span
                onClick={() => toggleTodo(t.id, t.done)}
                className={`todoText ${t.done ? "done" : ""}`}
              >
                {t.text}
              </span>

              <div className="btnGroup">
                <button
                  className="editBtn"
                  onClick={() => editTodo(t)}
                >
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTodo(t.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
