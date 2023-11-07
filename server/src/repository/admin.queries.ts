import { PrismaClient } from "@prisma/client";
import { Action, PropsToEdit, role } from "@types";

import {
  generateActionMessage,
  generateEditingQuery,
} from "../utils/db.utils.js";
const prisma = new PrismaClient();

class DB {
  async selectHashedPassword(username: string) {
    const response = prisma.users.findFirst({
      where: { username },
      select: { password: true },
    });
    return response;
  }
  async selectUserByName(username: string) {
    const response = prisma.users.findFirst({
      where: { username },
    });
    return response;
  }
  async selectUserByID(id: number) {
    const response = prisma.users.findFirst({
      where: { id },
    });
    return response;
  }
  async selectUsers() {
    const response = prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return response;
  }
  async insertAction(id: number, action: Action, params?: PropsToEdit) {
    const response = prisma.users_actions.create({
      data: {
        user_id: id,
        action_type: action,
        action_data: generateActionMessage(action, params),
      },
    });
    return response;
  }
  async insertUser(
    username: string,
    email: string,
    password: string,
    role?: role
  ) {
    const response = prisma.users.create({
      data: { username, email, password, role },
    });
    return response;
  }
  async updateUser(
    id: number,
    name: string | undefined,
    email: string | undefined
  ) {
    const data = generateEditingQuery(name, email);
    const response = prisma.users.update({ where: { id }, data });
    return response;
  }
  async selectActioins(page: number, perpage: number) {
    
    const startIndex = (page - 1) * perpage;

    const response = prisma.users_actions.findMany({
      skip: startIndex,
      take: perpage,
      orderBy: {user_id:'asc'},
      include: {
        users: {
          select: {
            username: true
          }
        }
      }
    });
    return response;
  }
  async selectAmountActions() {
    const amount = await prisma.users_actions.aggregate({
      _max: {
        id: true,
      },
    });
    return amount
  }
}

export default new DB();
