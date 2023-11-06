import { PrismaClient } from "@prisma/client";
import { role } from '@types';

const prisma = new PrismaClient();

class DB {
  async selectUserByName(username: string) {
    const response = prisma.users.findFirst({
      where: { username },
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
}

export default new DB();
