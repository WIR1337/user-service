import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./App.css";

type Setter<T> = Dispatch<SetStateAction<T>>;
interface User {
  id: string;
  username: string;
  password: string;
  created_at: string;
}
interface AuthProps {
  token: string;
  setToken: Setter<string>;
}
interface GetProps {
  token: string;
  setUsers: Setter<User[]>;
}
interface UsersListProps {
  token: string;
  users: User[];
  setUsers: Setter<User[]>;
}
const AuthComponent: FC<AuthProps> = ({ token, setToken }) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
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
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
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
};

const CreateUser: FC<{ token: string }> = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState();
  const [error, setError] = useState<any>();

  const handleCreateUser = async () => {
    try {
      // Fetch request to create a user
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include the bearer token in the header
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const responseData = await res.json();
        setResponse(responseData.message);
        setError("");
      } else {
        const responseData = await res.json();
        setError(responseData.errors);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>

      <div>
        <p>Response: {JSON.stringify(response)}</p>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    </div>
  );
};

const GetUsers: FC<GetProps> = ({ token, setUsers }) => {
  const [error, setError] = useState<any>();

  const handleGetUsers = async () => {
    try {
      // Fetch request to get users
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setUsers(responseData);
      } else {
        const responseData = await response.json();
        setError(responseData);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Get Users</h2>
      <button onClick={handleGetUsers}>Get Users</button>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

const UsersList: FC<UsersListProps> = ({ token, users, setUsers }) => {
  const [selected,setSelected] = useState(-1)

  const handleEditUser = (index: number) => {
    
    setSelected(index)
  };

  const handleSaveUser = async (user: User) => {
    try {
      const response = await fetch(`/api/edit/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: user.id, username: user.username }),
      });

      if (response.ok) {
      } else {
        console.error("Error saving user: ", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user: ", error);
    }
  };

  const handleCancelEdit = () => {
    setSelected(-1);
  };

  return (
    <div>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Created_at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {selected === index ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUsers((prevUsers) => {
                        const updatedUsers = [...prevUsers];
                        updatedUsers[index].username = e.target.value;
                        return updatedUsers;
                      })
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>{user.password}</td>
              <td>{user.created_at}</td>
              <td>
                {selected === index ? (
                  <div>
                    <button onClick={() => handleSaveUser(user)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditUser(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState("");
  return (
    <div>
      <AuthComponent token={token} setToken={setToken}></AuthComponent>
      <CreateUser token={token}></CreateUser>
      <GetUsers token={token} setUsers={setUsers}></GetUsers>
      <UsersList token={token} users={users} setUsers={setUsers}></UsersList>
    </div>
  );
};

export default App;
