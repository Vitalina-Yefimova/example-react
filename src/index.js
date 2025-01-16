import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// Получаем корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение, обернув его в QueryClientProvider
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();  