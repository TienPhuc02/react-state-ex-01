import { useReducer, useState } from "react";
import "./style.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Action =
  | { type: "add"; task: Task }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number; task: Task }
  | { type: "undo" };

type State = {
  tasks: Task[];
  history: Action[];
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const newTasks = [...state.tasks, action.task];
      return {
        tasks: newTasks,
        history: [...state.history, { type: "add", task: action.task }],
      };
    }

    case "toggle": {
      const newTasks = state.tasks.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );
      return {
        tasks: newTasks,
        history: [...state.history, { type: "toggle", id: action.id }],
      };
    }

    case "delete": {
      const newTasks = state.tasks.filter((task) => task.id !== action.id);
      return {
        tasks: newTasks,
        history: [...state.history, { type: "delete", id: action.id, task: action.task }],
      };
    }

    case "undo": {
      if (state.history.length === 0) return state;

      const lastAction = state.history[state.history.length - 1];
      let revertedTasks = [...state.tasks];

      switch (lastAction.type) {
        case "add":
          revertedTasks = state.tasks.filter((t) => t.id !== lastAction.task.id);
          break;

        case "toggle":
          revertedTasks = state.tasks.map((task) =>
            task.id === lastAction.id
              ? { ...task, completed: !task.completed }
              : task
          );
          break;

        case "delete":
          revertedTasks = [...state.tasks, lastAction.task];
          break;
      }

      return {
        tasks: revertedTasks,
        history: state.history.slice(0, -1),
      };
    }

    default:
      return state;
  }
}

function TaskManager() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], history: [] });
  const [input, setInput] = useState("");

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    dispatch({ type: "add", task: newTask });
    setInput("");
  }

  function handleToggleTask(id: number) {
    dispatch({ type: "toggle", id });
  }

  function handleDeleteTask(task: Task) {
    dispatch({ type: "delete", id: task.id, task });
  }

  function handleUndo() {
    dispatch({ type: "undo" });
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
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Ex05() {
  return <TaskManager />;
}
