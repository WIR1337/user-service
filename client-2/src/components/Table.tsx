import { FC } from "react";
import { Action } from "../types/components";
interface TableProps {
  actions: Action[];
}
const Table: FC<TableProps> = ({ actions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>UserID</th>
          <th>Username</th>
          <th>Date</th>
          <th>Action</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {actions.map(({id,user_id,users,action_time,action_type,action_data}) => {
          return (
            <tr key={id}>
              <td>{user_id} </td>
              <td>{users.username} </td>
              <td>{action_time}</td>
              <td>{action_type}</td>
              <td>{action_data.message}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
