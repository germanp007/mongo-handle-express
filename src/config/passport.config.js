import passport from "passport";
import localStrategy from "passport-local";
import { createHash, validationHash } from "../utils.js";
import { registerModel } from "../dao/mongo/models/sessions.model.js";

export const initializePassport = () => {
  // Local Strategy
  passport.use(
    "signupLocalStrategy",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { name } = req.body;
        try {
          const user = await registerModel.findOne({ email: username });
          if (user) {
            //usuario registrado
            return done(null, false);
          }
          //usuario no registrado
          let newUser;

          userForm.email === "adminCoder@coder.com" &&
          userForm.password === "adminCod3r123"
            ? (newUser = {
                name,
                email,
                password: createHash(password),
                rol: "admin",
              })
            : (newUser = {
                name,
                email,
                password: createHash(password),
                rol: "usuario",
              });
          const userCreated = await registerModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
