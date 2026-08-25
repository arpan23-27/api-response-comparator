function ChangeList({ changes }) {
  return (
    <div>
      <h2>Changes</h2>

      {changes.map((change) => (
        <div key={change.path}>
          <strong>{change.path}</strong>: {change.type}
        </div>
      ))}
    </div>
  );
}

export default ChangeList;