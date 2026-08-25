import { useState } from 'react';
import JsonInput from './components/JsonInput';
import compareJson from './utils/compareJson';


function App() {
const [responseA,  setResponseA] = useState('');
const [responseB, setResponseB] = useState('');
const [changes, setChanges] = useState([]);
const [filter, setFilter] = useState('all');



const sampleResponseA = {
  id: 123,
  name: 'John',
  role: 'Developer',
  active: true,
};

const sampleResponseB = {
  id: 123,
  name: 'John',
  role: 'Senior Developer',
  remote: true,
};

const handleLoadSampleData = () => {
  setResponseA(JSON.stringify(sampleResponseA, null, 2));
  setResponseB(JSON.stringify(sampleResponseB, null, 2));
};






const handleCompare = () => {
  try {
    const firstJson = JSON.parse(responseA);
    const secondJson = JSON.parse(responseB);

   const comparisonResult = compareJson(firstJson, secondJson);

setChanges(comparisonResult);


  } catch (error) {
    console.error('Invalid JSON:', error.message);
  }
};



const filteredChanges =
  filter === 'all'
    ? changes
    : changes.filter((change) => change.type === filter);

  return (
   <main>
    <h1>API Response Comparator</h1>

    <p>
      Compare two JSON API responses and identify added, removed, modified,
      and unchanged fields.
    </p>

    <JsonInput
    label="Response A"
    value={responseA}
    onChange={setResponseA}
    />

    <JsonInput
    label="Response B"
    value={responseB}
    onChange={setResponseB}
    />



<button onClick={handleLoadSampleData}>
  Load Sample Data
</button>




    <button onClick={handleCompare}>
  Compare Responses
</button>




<div>
  <button onClick={() => setFilter('all')}>
    All
  </button>

  <button onClick={() => setFilter('added')}>
    Added
  </button>

  <button onClick={() => setFilter('removed')}>
    Removed
  </button>

  <button onClick={() => setFilter('modified')}>
    Modified
  </button>

  <button onClick={() => setFilter('unchanged')}>
    Unchanged
  </button>
</div>



{filteredChanges.map((change) => (
  <div key={change.path}>
    <strong>{change.path}</strong>: {change.type}
  </div>
))}


   </main>
  )
}

export default App;
