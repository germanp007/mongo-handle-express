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

//////////////////// multer //////////////////////////
const checkValidFields = (user) => {
  const { first_name, email, password } = user;
  if (!first_name || !email || !password) {
    return false;
  } else {
    return true;
  }
};
//filtro para subir imagenes de usuarios
const profileMulterFilter = (req, file, cb) => {
  if (!checkValidFields(req.body)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/multer/users/img"));
  },

  filename: function (req, file, cb) {
    cb(null, `${req.body.email}-perfil-${file.originalname}`);
  },
});
const uploadProfile = multer({
  storage: profileStorage,
  fileFilter: profileMulterFilter,
});
const documentsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/multer/users/documents"));
  },

  filename: function (req, file, cb) {
    cb(null, `${req.user.email}-document-${file.originalname}`);
  },
});
const uploadDocuments = multer({ storage: documentsStorage });

const imgProductsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/multer/products/img"));
  },

  filename: function (req, file, cb) {
    cb(null, `${req.body.code}-product-${file.originalname}`);
  },
});
const uploadImgProducts = multer({ storage: imgProductsStorage });

export { uploadProfile, uploadDocuments, uploadImgProducts };
