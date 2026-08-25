import ChangeItem from "./ChangeItem";

function ChangeList({ changes }) {
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
