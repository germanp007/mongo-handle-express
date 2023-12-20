import { Router } from "express";
import { checkRole } from "../middlewares/errors/auth";
import { UserController } from "../controller/userController";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UserController.modifyRole);

export { router as userRouter };
