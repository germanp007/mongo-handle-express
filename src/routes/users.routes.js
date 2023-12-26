import { Router } from "express";
import { checkRole } from "../middlewares/errors/auth.js";
import { UserController } from "../controller/userController.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UserController.modifyRole);

export { router as userRouter };
