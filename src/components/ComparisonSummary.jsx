function ComparisonSummary({ changes }) {

    const added = changes.filter((change) => change.type === 'added').length;

    const removed = changes.filter((change) => change.type === 'removed').length;

    const modified = changes.filter(
        (change) => change.type === 'modified'
    ).length;

    const unchanged = changes.filter(
        (change) => change.type === 'unchanged'
    ).length;

    return (
        <div>
            <h2>Comparison Summary</h2>

            <p>Added: {added}</p>
            <p>Removed: {removed}</p>
            <p>Modified: {modified}</p>
            <p>Unchanged: {unchanged}</p>
        </div>
    );
}

export default ComparisonSummary;
