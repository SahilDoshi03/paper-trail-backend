import { PrismaClient } from "../generated/prisma";
import { UserType, PartialUserType } from "../schemas/User";

const prisma = new PrismaClient();

const getUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error getting user with id ${id}:`, error);
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Error getting user with email ${email}:`, error);
    throw error;
  }
};

const createUser = async (userData: UserType) => {
  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (id: number, userData: PartialUserType) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

export {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
