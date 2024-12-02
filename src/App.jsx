import { useState } from 'react';
import { useQuery } from 'react-query';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // קריאה ל-API בעזרת useQuery
  const { data: greeting, error, isLoading } = useQuery('greeting', async () => {
    const response = await fetch('http://localhost:3000/greeting');
    console.log(response)
    const result = await response.json();
    return result.greeting;
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // טיפול בשגיאה

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello Or Moshe {import.meta.env.VITE_SOME_KEY}</h1>
      <p>{greeting}</p> {/* הצגת ה-greeting */}
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
