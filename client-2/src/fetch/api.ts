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
export async function getActions(page:number,perpage:number,user_id?:number) {
    const response = fetch(`/actions?page=${page}&perpage=${perpage}&user_id=${user_id ? user_id : ''}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response
  }
