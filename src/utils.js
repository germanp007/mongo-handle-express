import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import bcrypt from "bcrypt";
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/images"));
  },

  filename: (req, file, cb) => {
    cb(null, `${req.body.name}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const validationHash = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};
