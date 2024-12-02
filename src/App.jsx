import { useQuery, useMutation } from 'react-query';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // קריאה ל-API לקבלת greeting
  const { data: greeting, error: greetingError, isLoading: isGreetingLoading } = useQuery(
    'greeting',
    async () => {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/greeting`);
      const result = await response.json();
      return result.greeting;
    }
  );

  // קריאה ל-API לקבלת count
  const {
    data: serverCount,
    error: countError,
    isLoading: isCountLoading,
    refetch,
  } = useQuery(
    'count',
    async () => {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/count`);
      const result = await response.json();
      if(typeof result !== 'object' || result === null) {
        return result
      } else {
        return result.count;
      }
    }
  );

  // ניהול count בשרת
  const { mutate: updateCount, isLoading: isUpdating } = useMutation(
    async (newCount) => {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: newCount }),
      });
      if (!response.ok) {
        throw new Error('Failed to update count');
      }
      return response.json();
    },
    {
      onSuccess: () => refetch(),
    }
  );

  // פונקציות לטיפול בלחיצות
  const handleIncrement = () => {
    updateCount(serverCount + 1); // שימוש בערך משרת
  };

  const handleDecrement = () => {
    updateCount(Math.max(serverCount - 1, 0)); // לא מאפשר ערך שלילי
  };

  // בדיקות טעינה ושגיאות
  const isGlobalLoading = isGreetingLoading || isCountLoading || isUpdating;

  if (isGlobalLoading) return <p>Loading...</p>;
  if (greetingError || countError) {
    return <p>Error: {greetingError?.message || countError?.message}</p>;
  }

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
      <p>{greeting}</p>
      <div className="card">
        <button onClick={handleIncrement} disabled={isUpdating || isCountLoading}>
          {isUpdating ? 'Updating...' : 'Increment'}
        </button>
        <button onClick={handleDecrement} disabled={isUpdating || isCountLoading} style={{ marginLeft: '10px' }}>
          {isUpdating ? 'Updating...' : 'Decrement'}
        </button>
        <p>Count is: {serverCount}</p>
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
