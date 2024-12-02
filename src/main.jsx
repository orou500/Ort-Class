import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'; // ייבוא QueryClient ו-QueryClientProvider
import './index.css';
import App from './App.jsx';

// יצירת QueryClient חדש
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* עטיפת האפליקציה ב-QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </StrictMode>
);
