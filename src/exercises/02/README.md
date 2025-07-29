# Writing Professional State Code

## 📚 Introduction

State isn't just about making things work - it's about making them work **elegantly**.

Let's learn how experienced React developers organize their state.

### Here's a common pattern for forms:

```typescript
// Instead of multiple state variables...
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');

// Use a single state object
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: ''
});

// And a single handler
function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
}
```

---

## 🎯 Exercise: Build a Smart Form

### Task Description
Create a contact form that:

- Uses a single state object for all fields
- Handles changes with one function  
- Computes validation without extra state

### Implementation Example

```typescript
function getErrors(data) {
  const errors = {};
  if (!data.email.includes('@')) {
    errors.email = 'Invalid email format';
  }
  return errors;
}

// Use it in your JSX
const errors = getErrors(formData);
{errors.email && <span className="error">{errors.email}</span>}
```

### 💡 Key Principle
> Derived values (like validation errors) should be computed from state, not stored in state. This keeps your state minimal and prevents synchronization bugs!
