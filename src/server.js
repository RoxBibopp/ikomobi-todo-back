require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const boardRoutes = require('./routes/boardRoutes');

app.use('/login', authRoutes);
app.use('/register', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/boards', boardRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Documentation disponible sur http://${process.env.DB_HOST}:${PORT}/api-docs`);
});
