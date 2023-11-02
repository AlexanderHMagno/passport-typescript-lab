import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      if (user) return done(null, user);

      throw new Error("user not found");
    } catch (error) {
      done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
    }
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: any) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
