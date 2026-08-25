import ChangeItem from "./ChangeItem";
import EmptyState from "./EmptyState";

function ChangeList({ changes , message}) {
  if (changes.length === 0) {
    return <EmptyState message={message}/>;
  }

  return (
    <div>
      <h2>Changes</h2>

      {changes.map((change) => (
        <ChangeItem key={change.path} change={change} />
      ))}
    </div>
  );
}

export default ChangeList;
