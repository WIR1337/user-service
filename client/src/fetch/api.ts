export async function login(loginUsername: string, loginPassword: string) {
  const response = fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginUsername,
      password: loginPassword,
    }),
  });
  return response;
}

export async function registration(regUsername:string, regEmail:string, regPassword:string) {
  const response = fetch("/auth/registration", {
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
  return response
}

export async function create(token:string,username:string,email:string,password:string) {
  const response = fetch("api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ username, email, password }),
  });
  return response
}

export async function getUsers(token:string) {
  const response = fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response
}

export async function update(token:string, body:{id:string, username?:string, email?:string}) {
  const response = fetch(`/api/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  return response
}