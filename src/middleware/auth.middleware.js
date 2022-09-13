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
    new JwtStrategy(opts, (decoded, done) => {
      try {
        const response = await getUserById(decoded.id);

        if (!response) return done(null, false);

        return done(null, decoded);

      } catch (error) {

        return done(error.message);

      }


      //*************************** */
      //TO DO Esta diferente en el repo
      //*************************** */
      // Users.findOne({ where: { id: decoded.id } }, (error, user) => {
      //   if (error) {
      //     return done(error, false);
      //   }
      //   if (user) {
      //     return done(null, decoded);
      //   } else {
      //     return done(null, false);
      //   }
      // })

    })
  );
};