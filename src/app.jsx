import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodoLogin } from './components/todo-login';
import { TodoSignUp } from './components/todo-signup';
import { TodosContext } from './todo-context';
import './index.scss';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLoggedIn')) || false);
  const [isSignInEnable, setIsSignInEnable] = useState(false);
  const contextValue = { todos, setTodos };

  const openDB = () => new Promise((resolve, reject) => {
    const request = window.indexedDB.open('TodoDB', 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');
        const request = store.getAll();
        request.onsuccess = () => {
          setTodos(request.result);
        };
        request.onerror = () => {
          console.error('Error retrieving data from IndexedDB:', request.error);
        };
      } catch (error) {
        console.error('Error opening IndexedDB:', error);
      }
    };
    fetchDataFromIndexedDB();
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleSign = () => {
    setIsSignInEnable(true);
  };

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/todo"
              element={(
                <div className="root">
                  <TodosContext.Provider value={contextValue || todos}>
                    <TodoList />
                    <TodoResults />
                    <TodoForm />
                    <div className="login-btn">
                      <button type="submit" className="login-button" onClick={() => { handleLogout(); }}>Log Out</button>
                    </div>
                  </TodosContext.Provider>
                </div>
              )}
            />
            <Route
              path="/"
              element={<Navigate to="/todo" replace />}
            />
          </>
        ) : (
          <>
            <Route
              path="/todo"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/"
              element={(
                <div className="loginbg">
                  {
                    isSignInEnable ? (
                      <TodoSignUp onSignIn={() => setIsSignInEnable(false)} />
                    ) : (
                      <TodoLogin onLogin={handleLogin} onSignIn={handleSign} />
                    )
                  }
                </div>
              )}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};
export default App;
