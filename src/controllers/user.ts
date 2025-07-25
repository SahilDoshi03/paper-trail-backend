
import { Request, Response } from "express";
import * as userService from "../services/user";
import { PartialUserSchema, UserSchema } from "../schemas/User";
import z from "zod";

const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  const userEmail = req.params.email;

  try {
    const user = await userService.getUserByEmail(userEmail);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = UserSchema.parse(req.body);
    const user = await userService.createUser(userData);
    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation Error", details: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userData = PartialUserSchema.parse(req.body);
    const updatedUser = await userService.updateUser(userId, userData);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation Error", details: error.message });
    }
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id

  try {
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
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
