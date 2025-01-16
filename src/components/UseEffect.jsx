import { useState, useEffect } from 'react';

// useEffect — это хук, который выполняет побочные эффекты в компонентах React

// Компонент для использования useEffect
function UseEffect() {
  const [data, setData] = useState([]); // Состояние для хранения данных
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  // useEffect — выполняет асинхронную операцию после первого рендера компонента
  useEffect(() => {
    const fetchUsers = async () => { // Асинхронная функция для получения данных
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Запрос данных с помощью fetch
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); // Преобразование ответа в формат JSON
        setData(result); // Сохранение полученных данных в состояние
      } catch (err) {
        setError(err); // Если произошла ошибка, сохраняем её в состоянии
      } finally {
        setIsLoading(false); // Завершение процесса загрузки в любом случае
      }
    };

    fetchUsers(); // Вызов асинхронной функции

  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании компонента

  // Статус загрузки
  if (isLoading) return <div>Loading...</div>;

  // Обработка ошибок
  if (error) return <div>Error: {error.message}</div>;

  // Отображение полученных данных
  return (
    <div className="space-y-4 pt-10">
      <h2 className="text-3xl text-gray-300 font-semibold text-center pb-4">
        User List
      </h2>
      {data.map((user) => (
        <div key={user.id} className="p-4 border rounded">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UseEffect;