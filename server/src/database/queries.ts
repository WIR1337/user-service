import { PrismaClient } from '@prisma/client';
import { Action, PropsToEdit } from "../types/actions.js";
import { role } from "../types/user.js";
import {
  generateActionMessage,
  generateEditingQuery,
} from "../utils/db.utils.js";
const prisma = new PrismaClient()

class DB {
  async getHashedPassword(username: string) {
    const response = await prisma.users.findFirstOrThrow({
      where: { username },
      select: { password: true },
    });
    return response;
  }
  async findUserByName(username: string) {
    const response = await prisma.users.findFirst({
      where: { username },
    });
    return response;
  }
  async findUserByID(id: number) {
    const response = await prisma.users.findFirstOrThrow({
      where: { id },
    });
    return response;
  }
  async createUser(username: string, email: string, password: string, role: role) {
    const response = await prisma.users.create({
      data: {username,email,password,role}
    });
    console.log({response})
    return response;
  }
  async getUsers() {
    const response = await prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return response;
  }
  async editUser(
    id: number,
    name: string | undefined,
    email: string | undefined
  ) {
    const data = generateEditingQuery(name, email);
    const response = await prisma.users.update({ where: { id }, data });
    return response;
  }
  async addAction(id: number, action: Action, params?: PropsToEdit) {
    const response = await prisma.users_actions.create({
      data: {
        user_id: id,
        action_type: action,
        action_data: generateActionMessage(action, params),
      },
    });
    console.log({response})
    return response;
  }
}

export default new DB();
