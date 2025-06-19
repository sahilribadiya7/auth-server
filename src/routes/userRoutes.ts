import express from "express";
import { getUser, getUsers } from "../controllers/usersControllers/userGets";
import { createUser } from "../controllers/usersControllers/userRegister";
import { loginUser } from "../controllers/usersControllers/userLogin";
import { updateUser } from "../controllers/usersControllers/userUpdate";
import { deleteUser } from "../controllers/usersControllers/userDelete";
import { edituser } from "../controllers/usersControllers/userEdit";
import { userDeleteToList } from "../controllers/usersControllers/userDeleteToList";

import authMiddleware from "../middleware/authMiddleware";
import authDeleteMiddleware from "../middleware/authDeleteMiddleware";
import { updatePassword } from "../controllers/usersControllers/userEditPassword";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:id", edituser);
router.get("/:id", authMiddleware, getUser);
router.get("/user", authMiddleware, getUser);
router.put("/editProfile/:id", authMiddleware, updateUser);
router.put("/updatePassword/:id", authMiddleware, updatePassword);
router.delete("/:id", authDeleteMiddleware, deleteUser);
router.delete("/delete/:id", userDeleteToList);

export default router;
