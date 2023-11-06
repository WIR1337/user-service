import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DB {
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
}

export default new DB();
