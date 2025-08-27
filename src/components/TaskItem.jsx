export default function TaskItem({ task, onToggle, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = !task.completed && date < now;
    
    return (
      <span style={{ color: isOverdue ? '#dc2626' : '#6b7280' }}>
        {date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
        {isOverdue && ' ⚠️'}
      </span>
    );
  };

  const getPriorityDot = () => {
    if (!task.dueDate) return 'dot yellow';
    
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const timeDiff = dueDate - now;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    if (!task.completed && dueDate < now) return 'dot red';
    if (daysDiff < 2) return 'dot red';
    if (daysDiff < 7) return 'dot yellow';
    return 'dot green';
  };

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
        <span className="task-title" style={{ 
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#6b7280" : "#1f2937"
        }}>
          {task.title}
        </span>
      </div>

      <div className="task-actions">
        <span className="badge" title={task.dueDate ? "Due date" : "Creation date"}>
          <span style={{display:"inline-flex", alignItems:"center"}}>
            {task.dueDate ? "⏰" : "🕒"}
          </span>
          {task.dueDate ? formatDate(task.dueDate) : formatDate(task.createdAt)}
        </span>

        <span className={getPriorityDot()} title="Priority" />

        <button className="btn btn-ghost" onClick={() => onDelete(task.id)} title="Delete task">
          🗑️
        </button>
      </div>
    </div>
  );
}