function ChangeItem({ change }) {
  return (
    <div>
      <strong>{change.path}</strong>: {change.type}
    </div>
  );
}

export default ChangeItem;
