import { FC, useState } from "react";
import { Setter, User } from "../types/components";

interface GetProps {
  token: string;
  setUsers: Setter<User[]>;
}
const GetUsers: FC<GetProps> = ({ token, setUsers }) => {
  const [error, setError] = useState<any>();

  const handleGetUsers = async () => {
    try {
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
export default GetUsers;
