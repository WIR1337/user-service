import { FC, useEffect, useState } from "react";
import { Setter } from "../types/components";

interface AuthProps {
  token: string;
  setToken: Setter<string>;
}

const Authorization: FC<AuthProps> = ({ token, setToken }) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");
  const [currentToken, setCurrentToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Bearer");

    if (token) {
      setToken(token);
    } else {
      setCurrentToken(
        "Token not found in local storage. You should loggin or register"
      );
    }
  }, []);

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
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        saveTokenToLocalStorage(data.token);
        setCurrentUser(loginUsername);
        setCurrentToken("");
        setError("");
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
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        saveTokenToLocalStorage(data.token);
        setCurrentToken("");
        setError("");
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
          type="email"
          placeholder="Email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
        <button onClick={handleRegistration}>Register</button>
      </div>

      
      {currentToken && (
        <p style={{ width: "600px" }}>CurrentToken: {currentToken}</p>
      )}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {currentUser && <h3>You are loggin as {currentUser}</h3>}
    </div>
  );
};

export default Authorization;
