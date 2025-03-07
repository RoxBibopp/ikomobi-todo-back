const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const User = require('./User')(sequelize, DataTypes);
const Task = require('./Task')(sequelize, DataTypes);
const Board = require('./Board')(sequelize, DataTypes);

const db = { User, Task, Board };

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ alter: true })
  .then(() => console.log('Base de données synchronisée'))
  .catch(err => console.error('Erreur de synchronisation :', err));

module.exports = { sequelize, ...db };
