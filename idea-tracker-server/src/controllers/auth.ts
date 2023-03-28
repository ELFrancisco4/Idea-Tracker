//Import local strategy from passport-local
const LocalStrategy = require("passport-local").Strategy;
import { comparePasswords } from "./helpers";
import { UserModel } from "../models/users";

// export const instantiateAuth = (passport) => {
//   const authenticateUser = async (name, password, done) => {

//     if (user == null) {
//       return done(null, false, { message: "No such user found" });
//     }

//     try {
//       if (await comparePasswords(name, password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Incorrect username or password" });
//       }
//     } catch (error) {
//       return done(error)
//     }
//   };

//   passport.use(
//     new LocalStrategy({
//       usernameField: "name",
//       passwordField: "password",
//       passReqToCallback: true,
//       session: false,
//     }, authenticateUser)
//   );

//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((user, done) => {});
// };

export const instantiateAuth = (passport) => {
  passport.use(UserModel.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((user, done) => {
    
  });
};
