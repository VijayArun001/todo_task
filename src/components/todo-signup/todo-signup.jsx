import * as React from 'react';
import './todo-signup.scss';
import { TodosContext } from '../../todo-context';

export const TodoSignUp = (props) => {
    const [data, setData] = React.useState({
       username: '',
       password: '',
       useremail: '',
       usernumber: '',
    });

    const handleOnChange = (value, name) => {
        setData((prevData) => ({
          ...prevData,
          [name]: value?.trim(),
        }));
    };
    const handleLogin = () => {
        const usernameLength = (data.username)?.length;
        const passwordLength = (data.password)?.length;
        const useremailLength = (data.useremail)?.length;
        if (usernameLength && passwordLength && useremailLength) {
            props?.onLogin();
        }
    };

  return (
    <div className="todo-signupcard">
      <div>
        <p className="todo-title">
          Sign Up
        </p>
      </div>
      <form>
        <div className="signup-input">
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
        <div className="signup-input">
          <input
            type="email"
            id="useremail"
            name="useremail"
            required
            className="input-bg"
            placeholder="Enter your user email..."
            onChange={(e) => handleOnChange(e?.target?.value, 'useremail')}
          />
        </div>
        <div className="signup-input">
          <input
            type="text"
            id="usernumber"
            name="usernumber"
            className="input-bg"
            placeholder="Enter your user number..."
            onChange={(e) => handleOnChange(e?.target?.value, 'usernumber')}
          />
        </div>
        <div className="signup-input">
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
        <div className="signup-btn">
          <button type="button" className="signup-cancel" onClick={() => props?.onSignIn()}>
            Cancel
          </button>
          <button type="submit" className="signup-button" onClick={() => { handleLogin(); }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
