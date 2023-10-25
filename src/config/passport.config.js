import passport from "passport";
import localStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { createHash, validationHash } from "../utils.js";
import { registerModel } from "../dao/mongo/models/sessions.model.js";
import { config } from "./config.js";

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

  // Estrategia Login y registro con Git-hub
  passport.use(
    "signupGithubStrategy",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackUrl: `http://localhots:3000/api/sessions${config.github.callbackUrl}`,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const user = await registerModel.findOne({ email: profile.username });
          console.log(profile);

          if (user) {
            //usuario registrado
            return done(null, user);
          }
          //usuario no registrado

          const newUser = {
            name: profile._json.name,
            email: profile.username,
            password: createHash(profile._id),
            rol: "usuario",
          };

          const userCreated = await registerModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          done(error);
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
};
