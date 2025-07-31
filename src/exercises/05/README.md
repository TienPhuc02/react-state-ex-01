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
stateDiagram-v2
    [*] --> Idle

    Idle --> AddingTask : Add Task (non-empty)
    AddingTask --> Idle : Task Added

    Idle --> TogglingTask : Toggle Task Completion
    TogglingTask --> Idle : Task Toggled

    Idle --> DeletingTask : Delete Task
    DeletingTask --> Idle : Task Deleted

    Idle --> Undoing : Undo (if history not empty)
    Undoing --> Idle : Undo Done


#### 3. Stately (XState) Design
Use [Stately.ai](https://stately.ai) to create a visual state machine for your task manager reducer, including all actions (add, toggle, delete, undo) and state transitions, then screenshot/export your design and include it in your submission.
const taskManagerMachine = createMachine({
  id: 'taskManager',
  initial: 'ready',
  context: {
    tasks: [],
    history: [],
    input: ""
  },
  states: {
    ready: {
      on: {
        ADD_TASK: { cond: 'inputNotEmpty', target: 'addingTask' },
        TOGGLE_TASK: { target: 'togglingTask' },
        DELETE_TASK: { target: 'deletingTask' },
        UNDO: { cond: 'hasHistory', target: 'undoing' },
        UPDATE_INPUT: { actions: 'updateInputValue' }
      }
    },
    addingTask: {
      entry: ['saveHistory', 'addNewTask', 'clearInput'],
      always: 'ready'
    },
    togglingTask: {
      entry: ['saveHistory', 'toggleTaskCompletion'],
      always: 'ready'
    },
    deletingTask: {
      entry: ['saveHistory', 'deleteTask'],
      always: 'ready'
    },
    undoing: {
      entry: ['undoLastAction'],
      always: 'ready'
    }
  }
}, {
  actions: {
    saveHistory: (context) => { /* push current tasks into history */ },
    addNewTask: (context) => { /* add new task with input */ },
    clearInput: (context) => { /* clear input field */ },
    toggleTaskCompletion: (context, event) => { /* toggle task by id */ },
    deleteTask: (context, event) => { /* delete task by id */ },
    undoLastAction: (context) => { /* pop history and set tasks */ },
    updateInputValue: (context, event) => { context.input = event.value; }
  },
  guards: {
    inputNotEmpty: (context) => context.input.trim() !== "",
    hasHistory: (context) => context.history.length > 0
  }
});

### 💡 Key Principle
> Reducers centralize complex state logic and ensure all updates follow consistent patterns.
