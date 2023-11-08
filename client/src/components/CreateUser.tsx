import { FC, useState } from "react";
import { create } from "../fetch/api";
import { createTimestamp } from "../utils/event.utils";
const generateMessage = (id: number, username: string,user_id: number) => {
  return {
    id,
    user_id,
    username,
    action_type: "create",
    action_data: { message: "User is created" },
    action_time: createTimestamp(),
  };
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

  const handleCreateUser = async () => {
    try {
      const res = await create(token, username, email, password);
      
      if (res.ok) {
        const { action_id, created_user } = await res.json();
        socketSend(generateMessage(action_id, created_user.username,created_user.id));
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
        {error && <p>Error: {JSON.stringify(error)}</p>}
      </div>
    </div>
  );
};

export default CreateUser;
