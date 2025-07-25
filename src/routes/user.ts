
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../controllers/user";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .get(getUserByEmail)
  .post(createUser)

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser)

export default router;
