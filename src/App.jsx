import { useMemo, useState, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import FilterTabs from "./components/FilterTabs";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks:v1", []);
  const [activeTab, setActiveTab] = useState("all");
  const [openForm, setOpenForm] = useState(false);

  const addTask = useCallback((title) => {
    setTasks(prev => [
      { id: uid(), title, completed: false },
      ...prev
    ]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const filtered = useMemo(() => {
    if (activeTab === "pending") return tasks.filter(t => !t.completed);
    if (activeTab === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, activeTab]);

  return (
    <div className="app">
      <header className="hero">
        <h1>To-Do App</h1>
      </header>

      <FilterTabs active={activeTab} onChange={setActiveTab} />

      <main className="content">
        <div className="toolbar">
          <h2>Tasks</h2>
          <button className="btn btn-primary" onClick={() => setOpenForm(true)}>
            + Add Task
          </button>
        </div>

        <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      {openForm && <TaskForm onSubmit={addTask} onClose={() => setOpenForm(false)} />}
    </div>
  );
}
