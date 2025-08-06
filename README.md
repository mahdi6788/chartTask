# 📊 React D3 Chart App

This is a simple React application that dynamically renders charts using D3.js based on the structure of the provided data.

---

## 📌 Features

- Automatically detects whether each chart is **single-series** or **multi-series**
- Renders line charts using **D3.js**
- Skips `null` values appropriately (per-series handling for multi-series)
- Dynamically displays each chart title

---

## 📂 Data Format (`data.json`)

The application loads chart definitions from a local `data.json` file with the following format:

```json
[
  {
    "title": "single series chart",
    "data": [[timestamp, value]]
  },
  {
    "title": "multi series chart",
    "data": [[timestamp, [value1, value2, value3]]]
  }
]

