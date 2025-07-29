# Managing Complex State

## 📚 Introduction

When state logic becomes complex, **reducers** help centralize state updates and make them more predictable.

---

## 🎯 Exercise: Build a Task Manager

### Task Description
Instead of scattered setState calls, use useReducer for complex state management.

### Problem - Hard to track state changes:

```typescript
// ❌ Hard to track state changes
const [tasks, setTasks] = useState([]);
const [history, setHistory] = useState([]);

function addTask(task) {
  setTasks([...tasks, task]);
  setHistory([...history, { type: 'add', task }]);
}
```

### Solution - Centralized state updates:

```typescript
// ✅ Centralized state updates
const [state, dispatch] = useReducer(reducer, {
  tasks: [],
  history: []
});

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        tasks: [...state.tasks, action.task],
        history: [...state.history, action]
      };
  }
}
```

### Keep reducers pure:

- No side effects
- No async operations
- Only compute new state

### 🤔 Consider

- **How do you handle multiple related state updates?**
- **What happens when state logic becomes complex?**
- **How do you make state changes more predictable?**

### 📊 Requirements: Create All 3 State Visualizations

Before implementing your task manager, you must design the reducer's state flow using **ALL THREE** approaches:

#### 1. Raw Text Diagram
Create a detailed text-based description of all reducer actions and state transitions:

```
TASK MANAGER REDUCER STATE FLOW

Initial State:
- tasks: [] (empty array)
- history: [] (empty array to track actions for undo)

Actions and State Transitions:

1. ADD Action
   Payload: { type: 'add', text: string, id: number }
   State Changes:
   - Create new task: { id, text, completed: false }
   - Append new task to tasks array
   - Add action to history array for undo functionality
   Result: New state with added task and updated history

2. TOGGLE Action
   Payload: { type: 'toggle', id: number }
   Conditions: Task with given ID must exist
   State Changes:
   - Find task by ID and toggle completed status
   - Keep all other tasks unchanged (immutable update)
   - Add action to history for undo capability
   Result: New state with one task's completion toggled

3. DELETE Action
   Payload: { type: 'delete', id: number, task: object }
   State Changes:
   - Remove task from tasks array by ID
   - Store original task in action payload for undo
   - Add action to history with task data
   Result: New state with task removed

4. UNDO Action
   Payload: { type: 'undo' }
   Conditions: History must not be empty
   State Changes:
   - Pop last action from history array
   - Reverse the action based on its type:
     * add → remove the added task
     * toggle → toggle back the completion status
     * delete → restore the deleted task
   - Update tasks array accordingly
   Result: Previous state restored, history shortened

Error Handling:
- Invalid action types return current state unchanged
- Empty history prevents undo operation
- Missing task IDs are ignored safely
- State is never mutated directly (immutable updates)
- Each action tracks necessary data for reversal

Complex Logic:
- Undo requires storing enough data to reverse actions
- Delete action must preserve original task for restoration
- History grows with each action, enabling multiple undos
- Each action type has specific reversal logic
```

#### 2. Mermaid Diagram
Create a professional state diagram using Mermaid syntax:


#### 3. Stately (XState) Design
Use [Stately.ai](https://stately.ai) to create a visual state machine for your task manager reducer, including all actions (add, toggle, delete, undo) and state transitions, then screenshot/export your design and include it in your submission.

### 💡 Key Principle
> Reducers centralize complex state logic and ensure all updates follow consistent patterns.
