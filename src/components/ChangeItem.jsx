function ChangeItem({ change }) {
  return (
    <div className={`change-item ${change.type}`}>
      <div className="change-header">
        <strong>{change.path}</strong>

        <span className={`change-badge ${change.type}`}>
          {change.type}
        </span>
      </div>

      {change.type === "modified" && (
        <div className="change-values">
          <p>
            <span>Old:</span> {JSON.stringify(change.oldValue)}
          </p>

          <p>
            <span>New:</span> {JSON.stringify(change.newValue)}
          </p>
        </div>
      )}

      {change.type === "added" && (
        <div className="change-values">
          <p>
            <span>New:</span> {JSON.stringify(change.newValue)}
          </p>
        </div>
      )}

      {change.type === "removed" && (
        <div className="change-values">
          <p>
            <span>Old:</span> {JSON.stringify(change.oldValue)}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChangeItem;
