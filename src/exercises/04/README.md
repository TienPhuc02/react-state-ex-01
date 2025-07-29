# Calculated vs Stored Values

## 📚 Introduction

Not everything needs to be in state! If you can calculate a value from existing data, you probably should.

### Before - storing everything:

```typescript
// Before - storing everything
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [tax, setTax] = useState(0);
```

### After - calculate what we can:

```typescript
// After - calculate what we can
const [items, setItems] = useState([]);
const total = items.reduce((sum, item) => (
  sum + item.price
), 0);
```

---

## 🎯 Exercise: Fix the Shopping Cart

### Task Description
This shopping cart stores too much information. Optimize it by calculating derived values.

### Problem Code

```typescript
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [tax, setTax] = useState(0);
```

### Try to:

- Keep only the items array in state
- Calculate other values when needed
- Remove all redundant state variables

### 🤔 Consider

- **Which values can be calculated from existing data?**
- **What happens when you need to update derived values?**
- **How do you prevent unnecessary recalculations?**

### 💡 Key Principle
> Remember: Calculations are cheap, bugs from out-of-sync state are expensive!
