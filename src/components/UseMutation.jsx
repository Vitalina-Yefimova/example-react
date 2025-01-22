import { useMutation } from 'react-query';
// useMutation — это хук из библиотеки react-query.
// Он используется для управления запросами, которые изменяют данные (POST, PUT, PATCH, DELETE).

import { useState } from 'react';
// useState — это хук из React, который позволяет добавлять состояние в функциональные компоненты.
// Он принимает начальное состояние и возвращает массив с двумя элементами: текущим состоянием и функцией для его обновления.

// Функции для отправки запросов на сервер:

// POST - создание нового пользователя
const addUser = async (newUser) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Указывает, что данные отправляются в формате JSON
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// PATCH - частичное обновление пользователя
const patchUser = async (patchedUser) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${patchedUser.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchedUser),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// PUT - полное обновление пользователя
const updateUser = async (updatedUser) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// DELETE - удаление пользователя
const deleteUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Компонент с формами для добавления, обновления, удаления пользователей
export default function UseMutation() {

  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [patchUserId, setPatchUserId] = useState('');
  const [patchName, setPatchName] = useState('');
  const [updateUserId, setUpdateUserId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [deleteUserId, setDeleteUserId] = useState('');

  // Мутации для различных операций; каждая мутация принимает функцию-обработчик и возвращает объект с методом mutate, который запускает запрос; 
  // mutate - это асинхронная функция.
  const { mutate: addMutate } = useMutation(addUser, {
    onSuccess: (data) => { // onSuccess — колбэк, который срабатывает при успешном выполнении запроса; data — данные, полученные в результате запроса
      console.log('New user added:', data);
      setName(''); // Очистка поля name после успешного добавления пользователя
      setEmail(''); // Очистка поля email после успешного добавления пользователя
    },
  });
  const { mutate: patchMutate } = useMutation(patchUser, {
    onSuccess: (data) => {
      console.log('User patched', data);
      setPatchUserId('');
      setPatchName('');
    },
  });
  const { mutate: updateMutate } = useMutation(updateUser, {
    onSuccess: (data) => {
      console.log('User updated:', data);
      setUpdateUserId('');
      setUpdateName('');
      setUpdateEmail(''); 
    },
  });
  const { mutate: deleteMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      console.log(`User with ID ${deleteUserId} deleted.`);
      setDeleteUserId(''); 
    },
  });

  // Функции-обработчики для отправки данных на сервер
  const handleAddUser = (e) => { // e - объект события
  e.preventDefault(); // Отмена отправки формы по умолчанию (чтобы страница не перезагружалась)
  const newUser = {
    name, // Получение значения поля name
    email, // Получение значения поля email
    };
    addMutate(newUser); // Отправка данных на сервер для создания нового пользователя
  };
  
  const handlePatchUser = (e) => {
  e.preventDefault();
  const patchedUser = {
    id: patchUserId,
    name: patchName,
    };
    patchMutate(patchedUser); // Частичное обновление пользователя
  };
  
  const handleUpdateUser = (e) => {
  e.preventDefault();
    const updatedUser = {
    id: updateUserId,
    name: updateName,
    email: updateEmail,
    };
    updateMutate(updatedUser); // Полное обновление пользователя
  };
  
  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteMutate(deleteUserId); // Удаление пользователя
};

  return (
    <div className="space-4 pt-10 pb-40">
      
      {/* Форма добавления пользователя (POST) */}
      <form
        onSubmit={handleAddUser} // onSubmit - событие, которое срабатывает при отправке формы
        className="space-y-4">
        <input
          name="name"
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Обработчик изменения значения поля name (при вводе) 
          className="border p-2 mr-3 text-gray-800"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 text-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white text-center py-2 pl-4 pr-[42px] ml-56 rounded">
          Add User
        </button>
      </form>

      {/* Форма частичного обновления пользователя (PATCH) */}
      <form onSubmit={handlePatchUser} className="space-y-4">
        <input
          name="id"
          type="text"
          placeholder="User ID"
          value={patchUserId}
          onChange={(e) => setPatchUserId(e.target.value)}
          className="border p-2 mr-3 text-gray-800"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Updated Name"
          value={patchName}
          onChange={(e) => setPatchName(e.target.value)}
          className="border p-2 text-gray-800"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white py-2 pl-4 pr-[33px] ml-56 rounded">
          Patch User
        </button>
      </form>

      {/* Форма обновления пользователя (PUT) */}
      <form
        onSubmit={handleUpdateUser}
        className="space-y-4">
        <input
          name="id"
          type="text"
          placeholder="User ID"
          value={updateUserId}
          onChange={(e) => setUpdateUserId(e.target.value)}
          className="border p-2 mr-3 text-gray-800"
          required
        />
        <input
          name="name"
          type="text"
          placeholder="New Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          className="border p-2 text-gray-800"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="New Email"
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
          className="border p-2 ml-3 text-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 pl-4 pr-[19px] ml-3.5 rounded">
          Update User
        </button>
      </form>
      
      {/* Форма удаления пользователя (DELETE) */}
      <form
        onSubmit={handleDeleteUser}
        className="space-y-4">
        <input
          name="userId"
          type="text"
          placeholder="User ID"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
          className="border p-2 mr-12 text-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white py-2 pl-3 pr-[30px] ml-[386px] rounded">
          Delete User
        </button>
      </form>
    </div>
  );
}