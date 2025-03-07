const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API To-Do List',
      version: '1.0.0',
      description: 'Documentation API todo-list',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Serveur',
      },
    ],
  },

  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
