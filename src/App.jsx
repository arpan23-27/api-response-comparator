import { useState } from 'react';
import JsonInput from './components/JsonInput';


function App() {
const [responseA,  setresponseA] = useState('');
const [responseB, setresponseB] = useState('');

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
   </main>
  )
}

export default App;
