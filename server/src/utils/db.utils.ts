import { Action, PropsToEdit } from "../types/actions.js";
export function generateEditingQuery(
  username: string | undefined,
  email: string | undefined
) {
  var data: { username?: string; email?: string } = {};

  if (username) data.username = username;
  if (email) data.email = email;

  return data;
}

export function generateActionMessage(action: Action, params?: PropsToEdit) {
  var generatedMessage = { message: "" };
  if (action == "create") {
    generatedMessage.message = "User is created";
  }
  if (action == "update" && params != undefined) {
    const { prevName, prevEmail, username, email } = params;

    let chunk_1 = username
      ? `Name changed from ${prevName} to ${username}`
      : "";
    let chunk_2 = email ? `Email changed from ${prevEmail} to ${email}` : "";

    generatedMessage.message = `${chunk_1} ${chunk_2}`;
  }
  return generatedMessage;
}
