import { EError } from "../../service/errors/enums.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.INVALID_TYPES_ERROR:
      res.json({ status: "error", message: error.cause });
      break;

    case EError.DATABASE_ERROR:
      res.json({ status: "error", message: error.cause });
      break;

    case EError.INVALID_BODY_JSON:
      res.json({ status: "error", message: error.cause });
      break;
    case EError.AUTH_ERROR:
      res.json({ status: "error", message: error.cause });
      break;
    default:
      res.json({
        status: "error",
        message: "Error",
      });
  }
};
