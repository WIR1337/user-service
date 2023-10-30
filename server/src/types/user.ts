export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: role;
  created_at: string;
}

export type role = "admin" | "user";

export interface HashedPassword {
  password: string;
}
