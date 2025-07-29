
# Tổ Chức Giá Trị State

## 📚 Giới Thiệu

Khi component của bạn cần theo dõi nhiều giá trị, bạn có thể lựa chọn:

### Cách 1: Nhiều Biến State Riêng Lẻ
```typescript
const [size, setSize] = useState(16);
const [bold, setBold] = useState(false);
```

### Cách 2: Một Đối Tượng State Duy Nhất
```typescript
const [styles, setStyles] = useState({
  size: 16,
  bold: false
});
```

### 💡 Nguyên Tắc Cốt Lõi
> Dùng các state riêng lẻ khi các giá trị thay đổi độc lập. Dùng một object khi các giá trị có liên quan hoặc thường thay đổi cùng nhau.

---

## 🎯 Bài Tập: Xây Dựng Text Editor

### Mô Tả Nhiệm Vụ
Tạo một text editor đơn giản để quản lý kiểu chữ bằng React state.

### Triển Khai
```typescript
function TextEditor() {
  // Thử dùng state riêng lẻ trước
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [textColor, setTextColor] = useState('black');

  // Suy nghĩ: Liệu dùng object sẽ hợp lý hơn?
  const [styles, setStyles] = useState({
    fontSize: 16,
    isBold: false,
    textColor: 'black'
  });
}
```

### 🤔 Hãy Cân Nhắc

- **Cách nào làm code của bạn rõ ràng hơn?**
- **Điều gì sẽ xảy ra khi bạn cần reset tất cả giá trị?**
- **Những giá trị này có thường xuyên thay đổi cùng nhau không?**
