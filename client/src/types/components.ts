import { Dispatch, SetStateAction } from "react";
export type Setter<T> = Dispatch<SetStateAction<T>>;

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    created_at: string;
  }