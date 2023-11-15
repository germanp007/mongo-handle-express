import passport from "passport";
import localStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { createHash, validationHash } from "../utils.js";
import { registerModel } from "../dao/mongo/models/sessions.model.js";
import { config } from "./config.js";
import { UsersService } from "../service/users.service.js";

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
        const { first_name, last_name, age } = req.body;
        try {
          const user = await UsersService.getUserByEmail(username);

          if (user) {
            //usuario registrado
            return done(null, false);
          }
          //usuario no registrado

          const newUser = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password),
            rol: username === config.admin ? "admin" : "user",
          };

          const userCreated = await UsersService.createUsers(newUser);
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
          const user = await UsersService.getUserByEmail(username);

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
          const user = await UsersService.getUserByEmail(profile.username);

          if (user) {
            //usuario registrado
            return done(null, user);
          }
          //usuario no registrado

          const newUser = {
            first_name: profile._json.name,
            email: profile.username,
            password: createHash(profile.id),
            rol: "user",
          };

          const userCreated = await UsersService.createUsers(newUser);
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
