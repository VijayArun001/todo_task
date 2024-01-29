import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const openDB = () => new Promise((resolve, reject) => {
    const request = window.indexedDB.open('TodoDB', 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const addTaskToDB = (db, newTask) => new Promise((resolve, reject) => {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');
    const request = store.add({ task: newTask });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });

  const getAllTasksFromDB = (db) => new Promise((resolve, reject) => {
      const transaction = db.transaction(['tasks'], 'readonly');
      const store = transaction.objectStore('tasks');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  const handleAddTodo = async () => {
    if (!task.trim()) { return; }

    try {
      const db = await openDB();
      await addTaskToDB(db, task);
      const updatedTodos = await getAllTasksFromDB(db);
      setTodos(updatedTodos);
      setTask('');
    } catch (error) {
      console.error('Error adding task to IndexedDB:', error);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
