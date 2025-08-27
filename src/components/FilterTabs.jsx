export default function FilterTabs({ active, onChange, overdueCount }) {
  return (
    <nav className="tabs" role="tablist" aria-label="Task filters">
      <button
        className={active === "all" ? "tab active" : "tab"}
        onClick={() => onChange("all")}
        role="tab"
        aria-selected={active === "all"}
      >
        Today
      </button>
      <button
        className={active === "pending" ? "tab active" : "tab"}
        onClick={() => onChange("pending")}
        role="tab"
        aria-selected={active === "pending"}
      >
        Pending
      </button>
      <button
        className={active === "completed" ? "tab active" : "tab"}
        onClick={() => onChange("completed")}
        role="tab"
        aria-selected={active === "completed"}
      >
        Completed
      </button>
      <button
        className={active === "overdue" ? "tab active" : "tab"}
        onClick={() => onChange("overdue")}
        role="tab"
        aria-selected={active === "overdue"}
      >
        Overdue {overdueCount > 0 && `(${overdueCount})`}
      </button>
    </nav>
  );
}