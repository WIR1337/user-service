import React, { FC, useState } from "react";
import { Setter, User } from "../types/components";
import { useWebSocket } from "../websocket";
import CreateUser from "./CreateUser";
import GetUsers from "./GetUsers";
import UsersList from "./UsersList";
interface MainProps {
  token: string;
  tokenSetter: Setter<string>
}
const Main: FC<MainProps> = ({ token ,tokenSetter}) => {
  const [users, setUsers] = useState<User[]>([]);
  const { sendMessage } = useWebSocket(token);
  const removeToken = async () => {
    localStorage.removeItem("Bearer");
    tokenSetter("");
  };

  return (
    <div>
      <div style={{ width: "600px", wordWrap: "break-word" }}>
        Token: {token}
      </div>
      <button onClick={removeToken}>Remove token</button>
      <CreateUser token={token} socketSend={sendMessage}></CreateUser>
      <GetUsers token={token} setUsers={setUsers}></GetUsers>
      <UsersList
        token={token}
        users={users}
        setUsers={setUsers}
        socketSend={sendMessage}
      ></UsersList>
    </div>
  );
};

export default Main;
