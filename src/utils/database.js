const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: '5432'

  // dialect: 'postgres',
  // host: 'localhost',
  // username: 'postgres',
  // password: '12345',
  // database: 'airbnb',
  // port: '5432'
})


module.exports = {
  db
}