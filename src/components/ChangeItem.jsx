function ChangeItem({ change }) {
  return (
    <div>
      <strong>{change.path}</strong>: {change.type}
    {change.type  === 'modified' && (
        <div>
            <p>Old: {JSON.stringify(change.oldValue)}</p>
            <p>New: {JSON.stringify(change.newValue)}</p>
        </div>
    )}

    {change.type ===  'added' && (
        <p>New: {JSON.stringify(change.newValue)}</p>
    )}

    
    {change.type === 'removed' && (
        <p>Old: {JSON.stringify(change.oldValue)}</p>
      )}

    </div>
  );
}

export default ChangeItem;
