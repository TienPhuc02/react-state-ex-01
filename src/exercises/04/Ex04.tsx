import { useState, useMemo } from "react";
import "./style.css";

const TAX_RATE = 0.1;

interface CartItem {
  id: number;
  name: string;
  price: number;
}

function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const tax = useMemo(() => total * TAX_RATE, [total]);

  function addItem(item: CartItem) {
    setItems((prev) => [...prev, item]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="cart">
      <div className="items">
        <button
          onClick={() =>
            addItem({ id: Date.now(), name: "T-Shirt", price: 20 })
          }
        >
          Add T-Shirt ($20)
        </button>
        <button
          onClick={() => addItem({ id: Date.now(), name: "Hat", price: 15 })}
        >
          Add Hat ($15)
        </button>
      </div>

      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <p>Total: ${total.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Final Total: ${(total + tax).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function Ex04() {
  return <ShoppingCart />;
}
