export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task">
      <div className="task-left">
        <span
          className={task.completed ? "checkbox checked" : "checkbox"}
          role="checkbox"
          aria-checked={task.completed}
          onClick={() => onToggle(task.id)}
          title="Toggle complete"
        />
        <span className="task-title" style={{ textDecoration: task.completed ? "line-through" : "none"}}>
          {task.title}
        </span>
      </div>

      <div className="task-actions">
        <span className="badge" title="Due date">
          <span style={{display:"inline-flex", alignItems:"center"}}>🕒</span>
          <span className="muted">No date</span>
        </span>

        <span className="dot yellow" title="Priority" />

        <button className="btn btn-ghost" onClick={() => onDelete(task.id)} title="Delete task">
          🗑️
        </button>
      </div>
    </div>
  );
}
