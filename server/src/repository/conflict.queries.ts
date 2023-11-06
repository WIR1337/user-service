import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DB {
  async selectUserByName(username: string) {
    const response = prisma.users.findFirst({
      where: { username },
    });
    return response;
  }
}

export default new DB();
