import { Dispatch, SetStateAction } from "react";
export type Setter<T> = Dispatch<SetStateAction<T>>;


export interface Action {
  id: number;
  user_id: number;
  users: { username: string };
  action_type: "create" | "update";
  action_time: string;
  action_data: { message: string };
}



export interface ActionsWithPage {
  page: number
  actions: Action[]
}