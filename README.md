# Product Dashboard (React + Vite)

This is a small product dashboard app built with React (using Vite). It's part of a frontend assignment to test skills in working with data tables, filters, and state handling.

You can try it live here:  
👉 https://vi-react-assignment.vercel.app

---

## What it does

1. Loads dummy product data (locally mocked, but simulates API delay)
2. Displays it in a table: title, brand, category, price, rating
3. Lets you:
  1. Edit any row (all fields are editable)
  2. Delete rows
  3. Filter using dropdowns for each column
  4. Sort columns by clicking headers
  5. Switch between light and dark mode (it remembers your preference!)
4. All data changes and preferences are saved — so if you refresh, nothing is lost

---

## How to run it locally

Clone the repo and run:

```bash
npm install
npm run dev
```

Build it for production:

```bash
npm run build
```

## Tech used

- React + Vite
- Plain CSS (no libraries for tables or filters)
- LocalStorage (for both data persistence)
- Custom-built components: DataTable, Filters, SummaryBar

---

## Notes

This project doesn’t use any external table libraries like Material or React Table — everything’s built from scratch using basic React patterns and hooks.

I also added a few extra touches like a filter summary bar, and dynamic dropdown values based on current results.

---

## File Structure (in `src/`)

```
├── api/
│   └── mockApi.js         # Mocked data 
├── components/
│   ├── DataTable.jsx
│   ├── Filters.jsx
│   └── SummaryBar.jsx
├── data/
│   └── products.json   # Base dataset
├── App.jsx
├── App.css
└── main.jsx
```