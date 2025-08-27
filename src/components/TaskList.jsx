import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <div className="card"><em className="muted">No tasks to show.</em></div>;
  }
  return (
    <div className="list">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
