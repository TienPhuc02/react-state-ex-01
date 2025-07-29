import { useState } from "react";
import "./style.css";

interface TextStyle {
  fontSize: number;
  bold: boolean;
  color: string;
}

function TextEditor() {
  const [styles, setStyles] = useState<TextStyle>({
    fontSize: 16,
    bold: false,
    color: "black",
  });

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyles((prev) => ({
      ...prev,
      fontSize: parseInt(e.target.value, 10),
    }));
  };

  const handleBoldToggle = () => {
    setStyles((prev) => ({
      ...prev,
      bold: !prev.bold,
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStyles((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const handleReset = () => {
    setStyles({
      fontSize: 16,
      bold: false,
      color: "black",
    });
  };

  return (
    <div className="text-editor">
      <div className="controls">
        <div className="control-group">
          <label>Font Size</label>
          <input
            type="number"
            min="12"
            max="48"
            value={styles.fontSize}
            onChange={handleFontSizeChange}
          />
        </div>

        <div className="control-group">
          <label>Bold</label>
          <button
            onClick={handleBoldToggle}
            style={{ fontWeight: styles.bold ? "bold" : "normal" }}
          >
            B
          </button>
        </div>

        <div className="control-group">
          <label>Color</label>
          <select value={styles.color} onChange={handleColorChange}>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
      </div>

      <div className="preview">
        <p
          style={{
            fontSize: `${styles.fontSize}px`,
            fontWeight: styles.bold ? "bold" : "normal",
            color: styles.color,
          }}
        >
          Preview your text styles here
        </p>
      </div>

      <button className="reset" onClick={handleReset}>
        Reset All
      </button>
    </div>
  );
}

export default function Ex01() {
  return (
    <div className="container">
      <h2>Simple Text Editor</h2>
      <TextEditor />
    </div>
  );
}
