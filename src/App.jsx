import { useState } from 'react';
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
    refetch, // פונקציה לעדכון מחדש של הנתונים
  } = useQuery(
    'count',
    async () => {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/count`);
      const result = await response.json();
      return result.count;
    },
    {
      onSuccess: (data) => setCount(data || 0), // עדכון ה-state של count בזמן הטעינה
    }
  );

  // ניהול ה-count בשרת
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
      onSuccess: () => {
        refetch(); // עדכון הערך מקומי לאחר שמירתו בשרת
      },
    }
  );

  // ניהול ה-state המקומי של count
  const [count, setCount] = useState(0);

  // פונקציה לעדכון count בלחיצה
  const handleIncrement = () => {
    setCount((prev) => prev + 1); // עדכון מקומי מידי
    updateCount(count + 1); // שליחה לשרת
  };

  // פונקציה לעדכון count בהפחתה
  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0)); // לא מאפשר ערך שלילי
    updateCount(Math.max(count - 1, 0)); // שליחה לשרת עם הגבלה למינימום 0
  };

  // בדיקת טעינה ושגיאות
  if (isGreetingLoading || isCountLoading) return <p>Loading...</p>;
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
        <button onClick={handleIncrement} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Increment'}
        </button>
        <button onClick={handleDecrement} disabled={isUpdating} style={{ marginLeft: '10px' }}>
          {isUpdating ? 'Updating...' : 'Decrement'}
        </button>
        <p>Count is: {count}</p>
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
