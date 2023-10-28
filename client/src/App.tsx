import { useEffect, useState } from "react";
import "./App.css";

function AuthComponent() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Bearer");

    if (token) {
      setToken(token);
    } else {
      setCurrentToken(
        "Token not found in local storage. You should loggin or register"
      );
    }
  });

  function saveTokenToLocalStorage(token: string) {
    localStorage.setItem("Bearer", token);
  }
  const handleLogin = async () => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:loginUsername, password:loginPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        saveTokenToLocalStorage(data.token);
        setCurrentToken('')
        setError('');
      } else {
        const data = await response.json();
        setError(data);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  const handleRegistration = async () => {
    console.log({ regUsername, regPassword });
    try {
      const response = await fetch("/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: regUsername, password: regPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        saveTokenToLocalStorage(data.token);
        setCurrentToken('')
        setError('');
      } else {
        const data = await response.json();
        setError(data.errors);
      }
    } catch (error) {
      setError("An error occurred while registering.");
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Registration</h2>
        <input
          type="text"
          placeholder="Username"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
        <button onClick={handleRegistration}>Register</button>
      </div>
      {token && <p>Token: {token}</p>}
      {currentToken && <p>CurrentToken: {currentToken}</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <AuthComponent></AuthComponent>
    </div>
  );
};

export default App;
