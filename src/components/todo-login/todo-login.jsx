import * as React from 'react';
import './todo-login.scss';
import { TodosContext } from '../../todo-context';

export const TodoLogin = (props) => {
    const [data, setData] = React.useState({
       username: '',
       password: '',
    });
    const [errorMessage, setErrorMessage] = React.useState(false);

    const handleOnChange = (value, name) => {
        setData((prevData) => ({
          ...prevData,
          [name]: value?.trim(),
        }));
    };
  const handleLogin = () => {
    setErrorMessage(false);
    if (((data.username) === 'testuser') && (((data.password) === 'test@123'))) {
        props?.onLogin();
    } else {
        setErrorMessage(true);
    }
  };

  return (
    <div className="todo-logincard">
      <div>
        <p className="todo-title">
          Todo Application
        </p>
      </div>
      <form>
        <div className="login-input">
          <input
            type="text"
            id="username"
            name="username"
            required
            className="input-bg"
            placeholder="Enter your user name..."
            onChange={(e) => handleOnChange(e?.target?.value, 'username')}
          />
        </div>
        <div className="login-input">
          <input
            type="password"
            id="password"
            name="password"
            required
            className="input-bg"
            placeholder="Enter your password..."
            onChange={(e) => handleOnChange(e?.target?.value, 'password')}
          />
        </div>
        {
            errorMessage && (
            <span className="login-error">
              *Incorrect user name or password
            </span>
        )
        }
        <div className="login-btn">
          <button type="submit" className="login-button" onClick={(e) => { handleLogin(); e?.preventDefault(); }}>
            Log In
          </button>
        </div>
      </form>
      <span className="login-btn">
        Didn&apos;t have an account ?
      </span>
      <span
        className="login-signup"
        role="button"
        tabIndex={0}
        onClick={() => props?.onSignIn()}
        onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props?.onSignIn();
        }
      }}
      >
        Sign Up
      </span>
    </div>
  );
};
