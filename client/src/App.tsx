import { useState } from "react";
import "./App.css";
import { User } from "./types/components";

import { useWebSocket } from "./websocket";

import Authorization from "./components/Auth";
import CreateUser from "./components/CreateUser";
import GetUsers from "./components/GetUsers";
import UsersList from "./components/UsersList";


const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState("");
  const { sendMessage } = useWebSocket();
  return (
    <div>
      <Authorization token={token} setToken={setToken}></Authorization>
      {token && (
        <CreateUser token={token} socketSend={sendMessage}></CreateUser>
      )}
      {token && <GetUsers token={token} setUsers={setUsers}></GetUsers>}
      {token && (
        <UsersList token={token} users={users} setUsers={setUsers} socketSend={sendMessage}></UsersList>
      )}
    </div>
  );
};

export default App;
