import { PrismaClient } from '@prisma/client';
import { Action, PropsToEdit } from "../types/actions.js";
import { role } from "../types/user.js";
import {
  generateActionMessage,
  generateEditingQuery,
} from "../utils/db.utils.js";
const prisma = new PrismaClient()

class DB {
  async selectHashedPassword(username: string) {
    const response = await prisma.users.findFirstOrThrow({
      where: { username },
      select: { password: true },
    });
    return response;
  }
  async selectUserByName(username: string) {
    const response = await prisma.users.findFirst({
      where: { username },
    });
    return response;
  }
  async selectUserByID(id: number) {
    const response = await prisma.users.findFirstOrThrow({
      where: { id },
    });
    return response;
  }
  async selectUsers() {
    const response = await prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return response;
  }
  async insertAction(id: number, action: Action, params?: PropsToEdit) {
    const response = await prisma.users_actions.create({
      data: {
        user_id: id,
        action_type: action,
        action_data: generateActionMessage(action, params),
      },
    });
    return response;
  }
  async insertUser(username: string, email: string, password: string, role?: role) {
    const response = await prisma.users.create({
      data: {username,email,password,role}
    });
    console.log({response})
    return response;
  }
  async updateUser(id: number,name: string | undefined,email: string | undefined
  ) {
    const data = generateEditingQuery(name, email);
    console.log({data})
    const response = await prisma.users.update({ where: { id }, data });
    return response;
  }
 
}

export default new DB();
