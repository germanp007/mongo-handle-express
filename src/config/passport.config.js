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
          console.log(user);
          if (user) {
            //usuario registrado
            return done(null, false);
          }
          //usuario no registrado

          const newUser = {
            name,
            email: username,
            password: createHash(password),
            rol: username === "adminCoder@coder.com" ? "admin" : "usuario",
          };

          const userCreated = await registerModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

// Login strategy

passport.use(
  "loginLocalStrategy",
  new localStrategy(
    {
      usernameField: "email", //username ahora es igual email
    },
    async (username, password, done) => {
      try {
        const user = await registerModel.findOne({ email: username });

        if (!user) {
          return done(null, false);
        }
        if (!validationHash(password, user)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serealizacion y Deserializacion
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await registerModel.findById(id);
  done(null, user); // req.user informacion del usuario guardado q se trae de la BD
});
