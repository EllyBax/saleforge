// usersController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersController {
  async createUser(email, name, password) {
    try {
      return await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
    } catch (error) {
      console.error(error);
      return {
        message: "An error occurred while creating the user.",
        status: 500,
      };
    }
  }

  async findExistingUser(user_email) {
    console.log("Looking for user...");
    return await prisma.user.findUnique({
      where: {
        email: user_email,
      },
      select: {
        id: true,
        name: true,
        password: true,
        createdAt: false,
      },
    });
  }

  async deleteUser(user_id) {
    return await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  }
  // Add other methods like validateUser, deleteUser, updateUser here
}

export default new UsersController();
