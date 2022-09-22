//Dependencies
const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const { verbMiddleware } = require('./middleware/examples/verbs');
const path = require('path');
require('./middleware/auth.middleware')(passport);


//Archivos de rutas
const usersRouter = require('./users/users.routes').router;
const authRouter = require('./auth/auth.routes').router;
const accommodationsRouter =require('./accommodations/accommodations.routes').router;
const reservationsRouter = require('./reservations/reservations.routes').router;

const initModels = require('./models/init.models');
const defaultData = require('./utils/defaultData');
const swaggerDoc = require('./swagger.json');

//Configuraciones iniciales
const { db } = require('./utils/database');
const PORT = process.env.PORT || 8000;
const app = express();

initModels();

db.authenticate()
  .then(res => console.log('database autenticate'))
  .catch(error => console.log(error))

//{force:true}// es solo para desarrollo.
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

//para que el body de la peticion no salga undefined
app.use(express.json());

app.get('/', verbMiddleware, (req, res) => {
  res.status(200).json({ message: 'status ok' })
})

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/accommodations',accommodationsRouter);
app.use('/api/v1/reservations',reservationsRouter);
app.use('/v1/doc',swaggerUi.serve,swaggerUi.setup(swaggerDoc));


app.get("/api/v1/uploads/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})

app.get('/ejemplo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Felicidades, tienes credenciales para entrar aqui', email: req.user.email });
  })

app.listen(PORT, () => {
  console.log(`server started at port:${PORT}`);
});

//FORMAS DE EXPORTAR
// exports.default =app;
// module.exports=app;
// exports.app=app;
module.exports = {
  app
}
