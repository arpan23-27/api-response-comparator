import { useState } from "react";
import JsonInput from "./components/JsonInput";
import compareJson from "./utils/compareJson";
import ComparisonSummary from "./components/ComparisonSummary";
import ChangeList from "./components/ChangeList";
function App() {
  const [responseA, setResponseA] = useState("");
  const [responseB, setResponseB] = useState("");
  const [changes, setChanges] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [hasCompared, setHasCompared] = useState(false);

const isCompareDisabled =
  responseA.trim() === "" || responseB.trim() === "";


  const sampleResponseA = {
    id: 123,
    name: "John",
    role: "Developer",
    active: true,
  };

  const sampleResponseB = {
    id: 123,
    name: "John Shukla",
    role: "Senior Developer",
    remote: true,
  };

  const handleLoadSampleData = () => {
    setResponseA(JSON.stringify(sampleResponseA, null, 2));
    setResponseB(JSON.stringify(sampleResponseB, null, 2));
  };

  const handleCompare = () => {
    try {
      setError("");

      const firstJson = JSON.parse(responseA);
      const secondJson = JSON.parse(responseB);

      const comparisonResult = compareJson(firstJson, secondJson);

      setChanges(comparisonResult);
      setHasCompared(true);
    } catch (error) {
      setError("Please enter valid JSON in both responses.");
      console.error("Invalid JSON:", error.message);
    }
  };

  const handleSwapResponses = () => {
    setResponseA(responseB);
    setResponseB(responseA);
  };

  const handleReset = () => {
    setResponseA("");
    setResponseB("");
    setChanges([]);
    setError("");
    setFilter("all");
    setHasCompared(false);
  };

  const filteredChanges =
    filter === "all"
      ? changes
      : changes.filter((change) => change.type === filter);

  const emptyStateMessage = !hasCompared
    ? "Compare two responses to see the results."
    : filter !== "all" && filteredChanges.length === 0
      ? `No ${filter} changes found.`
      : "No differences found between the responses.";

  return (
    <main>
      <h1>API Response Comparator</h1>

      <p>
        Compare two JSON API responses and identify added, removed, modified,
        and unchanged fields.
      </p>

      <JsonInput label="Response A" value={responseA} onChange={setResponseA} />

      <JsonInput label="Response B" value={responseB} onChange={setResponseB} />

      <button onClick={handleLoadSampleData}>Load Sample Data</button>

      <button onClick={handleSwapResponses}>Swap Responses</button>

      <button onClick={handleCompare} disabled={isCompareDisabled}>
        Compare Responses
      </button>

      <button onClick={handleReset}>Clear</button>
      <ComparisonSummary changes={changes} />
      {error && <p>{error}</p>}

      <div>
        <button onClick={() => setFilter("all")}>All</button>

        <button onClick={() => setFilter("added")}>Added</button>

        <button onClick={() => setFilter("removed")}>Removed</button>

        <button onClick={() => setFilter("modified")}>Modified</button>

        <button onClick={() => setFilter("unchanged")}>Unchanged</button>
      </div>

      <ChangeList changes={filteredChanges} message={emptyStateMessage} />
    </main>
  );
}

export default App;
