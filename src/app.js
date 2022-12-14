//Dependencies
const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const { verbMiddleware } = require('./middleware/examples/verbs');
const path = require('path');
require('./middleware/auth.middleware')(passport);
const cors =require('cors');


const { upload } = require('./utils/testMulter')

//Archivos de rutas
const rolesRouter = require('./roles/roles.routes').router;
const usersRouter = require('./users/users.routes').router;
const authRouter = require('./auth/auth.routes').router;
const accommodationsRouter = require('./accommodations/accommodations.routes').router;
const reservationsRouter = require('./reservations/reservations.routes').router;
const placesRouter = require('./places/places.routes').router;

const initModels = require('./models/init.models');
const defaultData = require('./utils/defaultData');
const swaggerDoc = require('./swagger.json');

//Configuraciones iniciales
const { db } = require('./utils/database');
const { application } = require('express');
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
//Cors
app.use(cors());


app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/accommodations', accommodationsRouter);
app.use('/api/v1/reservations', reservationsRouter);
app.use('/api/v1/places', placesRouter);
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.get("/api/v1/uploads/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})

app.get("/api/v1/uploadsimgsaccomm/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploadsImgsAccommo/') + '/' + imgName)
})

app.post('/upload', upload.single('accommodationimg'), function (req, res) {
  res.status(200).json({ message: 'hola' })
})

app.listen(PORT, () => {
  console.log(`server started at port:${PORT}`);
});

module.exports = {
  app
}
