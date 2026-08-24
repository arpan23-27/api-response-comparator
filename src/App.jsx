import { useState } from 'react';
import JsonInput from './components/JsonInput';
import compareJson from './utils/compareJson';


function App() {
const [responseA,  setresponseA] = useState('');
const [responseB, setresponseB] = useState('');



const handleCompare = () => {
  try {
    const firstJson = JSON.parse(responseA);
    const secondJson = JSON.parse(responseB);

    const changes = compareJson(firstJson, secondJson);

    console.log(changes);
  } catch (error) {
    console.error('Invalid JSON:', error.message);
  }
};




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
    onChange={setresponseA}
    />

    <JsonInput
    label="Response B"
    value={responseB}
    onChange={setresponseB}
    />


    <button onClick={handleCompare}>
  Compare Responses
</button>


   </main>
  )
}

export default App;
