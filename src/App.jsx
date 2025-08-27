import { useState } from "react";

export default function App() {
  // only the shell for now
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="app">
      <header className="hero">
        <h1>Todo App</h1>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "all" ? "tab active" : "tab"}
          onClick={() => setActiveTab("all")}
        >
          Today
        </button>
        <button
          className={activeTab === "pending" ? "tab active" : "tab"}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={activeTab === "completed" ? "tab active" : "tab"}
          onClick={() => setActiveTab("completed")}
        >
          Overdue
        </button>
      </nav>

      <main className="content">
        <div className="toolbar">
          <h2>Tasks</h2>
          <button className="btn btn-primary" disabled>
            + Add Task
          </button>
        </div>

        <div className="card placeholder">
          <p>This is the base layout. Functionality coming next.</p>
        </div>
      </main>
    </div>
  );
}
