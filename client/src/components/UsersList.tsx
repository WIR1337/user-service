import { FC, useState } from "react";
import { update } from "../fetch/api";
import { Setter, User } from "../types/components";
import { createTimestamp } from "../utils/event.utils";
interface UsersListProps {
    token: string;
    users: User[];
    setUsers: Setter<User[]>;
    socketSend: (message: any) => void;
  }
const UsersList: FC<UsersListProps> = ({
    token,
    users,
    setUsers,
    socketSend,
  }) => {
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
      var body:{ id: string; username?: string; email?: string } = {
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
    const generateMessage = (action_id:number,params: {
      id: string;
      username?: string;
      email?: string;
    }) => {
      const { id ,username, email } = params;
  
      let chunk_1 = username
        ? `Name changed from ${initialUsername} to ${username}`
        : "";
      let chunk_2 = email ? `Email changed from ${initialEmail} to ${email}` : "";
  
      return {id:action_id,user_id:id,action_type: 'update',action_data: { message: `${chunk_1} ${chunk_2}` },action_time: createTimestamp()};
    };
    const handleSaveUser = async (user: User) => {
      if (initialUsername == user.username && initialEmail == user.email) {
        return;
      }
      const body = generateBody(user.id, user.username, user.email);
      
  
      try {
        const response = await update(token,body)
  
        if (response.ok) {
          const {message,id} = await response.json();
          const sendingData = generateMessage(id,body);
          console.log(socketSend)
          socketSend(sendingData);
          setResult(message);
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

  export default UsersList