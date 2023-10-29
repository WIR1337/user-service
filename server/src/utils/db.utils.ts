import { Action, PropsToEdit } from "../types/actions.js";
export function generateEditingQuery(
    id: string,
    name: string | undefined,
    email: string | undefined
  ) {
    var setClauses = [];
    try {
      if (name) {
        setClauses.push(`username = '${name}'`);
      }
      if (email) {
        setClauses.push(`email = '${email}'`);
      }
  
      if (setClauses.length === 0) {
        throw new Error("No valid update data provided.");
      }
  
      const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = ${id}`;
      return query;
    } catch (err: any) {
      console.log(err.message);
    }
    
    return "This should never happen";
  }

  export function generateActionMessage(action: Action, params?: PropsToEdit) {
    if (action == "create") {
      return { message: "User is created" };
    }
    if (action == "update" && params != undefined) {
      const { prevName, prevEmail, username, email } = params;
  
      let chunk_1 = username
        ? `Name changed from ${prevName} to ${username}`
        : "";
      let chunk_2 = email ? `Email changed from ${prevEmail} to ${email}` : "";
  
      return { message: `${chunk_1} ${chunk_2}` };
    }
  }