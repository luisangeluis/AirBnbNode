const Users = require("../models/user.model");
const { getUserById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "academlo" // debe estar en una variable de entorno
  };
  passport.use(
    new JwtStrategy(opts, async (decoded, done) => {
      try {
        const response = await getUserById(decoded.id);

        console.log('hola');
        if (!response) {
          return done(null, false);
        }

        return done(null, decoded);
      } catch (error) {
        return done(error.message);

      }
    })
  );
};