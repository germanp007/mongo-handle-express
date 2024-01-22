import { Router } from "express";
import { checkRole } from "../middlewares/errors/auth.js";
import { UserController } from "../controller/userController.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UserController.modifyRole);

router.post(
  "/:uid/documents",
  checkRole(["user"]),
  uploadDocuments.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
  ]),
  UserController.uploaderDocuments
);

export { router as userRouter };
