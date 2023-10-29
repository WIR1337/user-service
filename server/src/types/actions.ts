export type Action = "create" | "update";

export interface PropsToEdit {
  username?: string;
  email?: string;
  prevName: string;
  prevEmail: string;
}
