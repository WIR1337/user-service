import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./App.css";

type Setter<T> = Dispatch<SetStateAction<T>>;
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
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
  const removeToken = async () => {
    localStorage.removeItem("Bearer");
    setToken("");
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

      {token && (
        <div style={{ width: "600px", wordWrap: "break-word" }}>
          Token: {token}
        </div>
      )}
      {token && <button onClick={removeToken}>Remove token</button>}
      {currentToken && (
        <p style={{ width: "600px" }}>CurrentToken: {currentToken}</p>
      )}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {currentUser && <h3>You are loggin as {currentUser}</h3>}
    </div>
  );
};

const CreateUser: FC<{ token: string; socketSend: (message: any) => void }> = ({
  token,
  socketSend,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<any>();
  function createTimestamp() {
    const currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear() % 100;

    const formattedTimestamp = `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;

    return formattedTimestamp;
  }
  const generateMessage = (id: number, user_id: number) => {
    return {
      id,
      user_id,
      action_type: "create",
      action_data: { message: "User is created" },
      actions_time: createTimestamp(),
    };
  };
  const handleCreateUser = async () => {
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const { message, id, user_id } = await res.json();

        socketSend(generateMessage(id, user_id));
        setResponse(message);
        setError("");
      } else {
        const responseData = await res.json();
        setError(responseData);
        setResponse("");
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>

      <div>
        {response && <p>Response: {JSON.stringify(response)}</p>}
        {error && <p>Error: {JSON.stringify(error)}</p>}
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

      {error && <p>Error: {JSON.stringify(error)}</p>}
    </div>
  );
};

const UsersList: FC<UsersListProps> = ({ token, users, setUsers }) => {
  const [result, setResult] = useState<any>();
  const [selected, setSelected] = useState(-1);
  const [initialUsername, setInitialUsername] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  function clearRes() {
    setTimeout(() => setResult(""), 3000);
  }
  const handleEditUser = (index: number) => {
    const { username, email } = users[index];
    setInitialUsername(username);
    setInitialEmail(email);
    setSelected(index);
  };

  const generateBody = (id: string, username: string, email: string) => {
    var body: Partial<{ id: string; username: string; email: string }> = {
      id,
    };
    if (username !== initialUsername) {
      body.username = username;
    }
    if (email !== initialEmail) {
      body.email = email;
    }
    return body;
  };
  const handleSaveUser = async (user: User) => {
    try {
      const response = await fetch(`/api/edit/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(generateBody(user.id, user.username, user.email)),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        clearRes();
        setSelected(-1);
      } else {
        console.error("Error saving user: ", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user: ", error);
    }
  };

  const handleCancelEdit = () => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[selected].username = initialUsername;
      return updatedUsers;
    });
    setSelected(-1);
  };

  return (
    <div>
      <div>{JSON.stringify(result)}</div>
      <h2>Users List</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
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
              <td>
                {selected === index ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUsers((prevUsers) => {
                        const updatedUsers = [...prevUsers];
                        updatedUsers[index].email = e.target.value;
                        return updatedUsers;
                      })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.password}</td>
              <td>{user.role}</td>
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

function useWebSocket() {
  const [serviceStatus, setServiceStatus] = useState("");
  var socket: WebSocket;
  useEffect(() => {
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = event.data;
      console.log("Received:", data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      socket.close();
    };
  }, []);
  function sendMessage(message: any) {
    // if (serviceStatus == "Ready") {

    console.log("SENDED MESSAGE :", message);
    socket.send(JSON.stringify(message));
    // }
  }
  return { sendMessage };
}
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState("");
  const { sendMessage } = useWebSocket();
  return (
    <div>
      <AuthComponent token={token} setToken={setToken}></AuthComponent>
      {token && (
        <CreateUser token={token} socketSend={sendMessage}></CreateUser>
      )}
      {token && <GetUsers token={token} setUsers={setUsers}></GetUsers>}
      {token && (
        <UsersList token={token} users={users} setUsers={setUsers}></UsersList>
      )}
    </div>
  );
};

export default App;
