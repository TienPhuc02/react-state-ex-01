import { useState } from "react";
import "./style.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
  history: Task[][];
};

function TaskManager() {
  const [state, setState] = useState<State>({
    tasks: [],
    history: [],
  });

  const [input, setInput] = useState("");

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setState((prev) => ({
      tasks: [...prev.tasks, newTask],
      history: [...prev.history, prev.tasks],
    }));

    setInput("");
  }

  function handleToggleTask(id: number) {
    setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
      history: [...prev.history, prev.tasks],
    }));
  }

  function handleDeleteTask(id: number) {
    setState((prev) => ({
      tasks: prev.tasks.filter((task) => task.id !== id),
      history: [...prev.history, prev.tasks],
    }));
  }

  function handleUndo() {
    setState((prev) => {
      if (prev.history.length === 0) return prev;

      const lastTasks = prev.history[prev.history.length - 1];
      const newHistory = prev.history.slice(0, -1);

      return {
        tasks: lastTasks,
        history: newHistory,
      };
    });
  }

  return (
    <div className="task-manager">
      <form onSubmit={handleAddTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task..."
        />
        <button type="submit">Add</button>
      </form>

      <button
        onClick={handleUndo}
        disabled={state.history.length === 0}
        className="undo"
      >
        Undo
      </button>

      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ex05() {
  return <TaskManager />;
}
