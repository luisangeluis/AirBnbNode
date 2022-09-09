//Dependencies
const express = require('express');
const passport = require('passport');
const { verbMiddleware } = require('./middleware/examples/verbs');
require('./middleware/auth.middleware')(passport);
const path = require('path');
const initModels = require('./models/init.models');
const defaultData = require('./utils/defaultData');

//Archivos de rutas
const usersRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router

//Configuraciones iniciales
const { db } = require('./utils/database');
const app = express();

initModels();

db.authenticate()
  .then(res => console.log('database autenticate'))
  .catch(error => console.log(error))

{force:true}// es solo para desarrollo.
if (process.env.NODE_ENV === 'production') {
  db.sync()
    .then(() => {
      console.log('database synced');
      defaultData();
    })
    .catch(error => console.log(error))
} else {
  db.sync({ force: true })
  // db.sync()
    .then(() => {
      console.log('database synced');
      defaultData();
    })
    .catch(error => console.log(error))
}



// if (process.env.NODE_ENV === 'production') {
//   db.sync()
//     .then(() => {
//       console.log('Database synced')
//       defaultData()
//     })
//     .catch(err => console.log(err))
// } else {
//   db.sync({ force: true })
//     .then(() => {
//       if (process.env.NODE_ENV === 'production') {
//         db.sync()
//           .then(() => {
//             console.log('Database synced')
//             defaultData()
//           })
//           .catch(err => console.log(err))
//       } else {
//         db.sync({ force: true })
//           .then(() => {
//             console.log('Database synced')
//             defaultData()
//           })
//           .catch(err => console.log(err))
//       }
//       console.log('Database synced')
//       defaultData()
//     })
//     .catch(err => console.log(err))
// }





//para que el body de la peticion no salga undefined
app.use(express.json());

app.get('/', verbMiddleware, (req, res) => {
  res.status(200).json({ message: 'status ok' })
})

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.get("/api/v1/uploads/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})

app.get('/ejemplo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Felicidades, tienes credenciales para entrar aqui', email: req.user.email });
  })

app.listen(3000, () => {
  console.log('server started at port:3000');
});

//FORMAS DE EXPORTAR
// exports.default =app;
// module.exports=app;
// exports.app=app;
module.exports = {
  app
}
