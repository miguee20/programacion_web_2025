import { useEffect, useRef, useState } from "react";

export default function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    
    const finalDueDate = dueDate ? new Date(dueDate).toISOString() : null;
    onSubmit(trimmed, finalDueDate);
    setTitle("");
    setDueDate("");
    onClose();
  }

  return (
    <div className="modal" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Add Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <div style={{margin: '12px 0'}}>
            <label style={{display: 'block', marginBottom: '6px', fontWeight: '500'}}>
              Due Date (optional):
            </label>
            <input
              type="datetime-local"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{width: '100%'}}
            />
          </div>

          <div className="form-row">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}