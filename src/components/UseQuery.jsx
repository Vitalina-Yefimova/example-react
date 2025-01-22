import { useQuery } from 'react-query';

// useQuery — это хук из библиотеки React Query, который используется для выполнения асинхронных запросов 
// (например, для получения данных с сервера) и управления состоянием этих данных в React-приложении.

// Асинхронная функция, которая отвечает за выполнение HTTP-запроса для получения данных с сервера
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users'); // fetch - запрашивает данные по указанному URL
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Преобразование ответа в формат JSON
};

// Компонент для использования useQuery
export default function UseQuery() {
  const { data, error, isLoading } = useQuery('users', fetchUsers); // users - уникальный ключ для кэширования данных

  // Статус загрузки
  if (isLoading) return <div>Loading...</div>;

  // Обработка ошибок
  if (error instanceof Error) return <div> Error: {error.message}</div>;

  // Отображение полученных данных
  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-gray-300 font-semibold text-center pb-4">
        User List
      </h2>
      {data.map((user) => ( //map() — это метод массива в JS, который позволяет пройти по всем элементам массива и выполнить операцию для каждого элемента.
        <div key={user.id} className="p-4 border rounded">
          <h3 className="text-lg font-semibold">
            {user.name}
          </h3>
          <p>
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}

// key — это специальный атрибут в React, который используется при рендеринге списков. 
// Он помогает React правильно отслеживать и обновлять элементы списка, когда состояние компонента изменяется.