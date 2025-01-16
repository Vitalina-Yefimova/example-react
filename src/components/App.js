import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// QueryClient — это основной класс, который используется для создания экземпляра QueryClient.
// QueryClientProvider нужен для того, чтобы предоставить конфигурацию и контекст для работы с запросами в библиотеке react-query. 
// Это обёртка, которая необходима для правильной работы всех хуков react-query (таких как useQuery, useMutation и др.).

import UseQuery from './UseQuery';
import UseMutation from './UseMutation';
import Header from './Header';
// import UseEffect from './UseEffect';

const queryClient = new QueryClient(); // Создание нового экземпляра QueryClient для использования в приложении React   

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <Header />
      <div className="mt-6">
        <UseQuery />
        {/* <UseEffect /> */}
        <UseMutation />
      </div>
      </div>
       </QueryClientProvider>
      );
}

export default App;
