export type Action = "create" | "update";

export interface PropsToEdit {
  username?: string;
  email?: string;
  prevName: string;
  prevEmail: string;
}

export interface ActionID {
  id : number
}