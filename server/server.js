const express = require('express');
const clientRoutes = require('./routes/clientRoutes');
const middleware = require('./utils/middleware');
const errorHandler = require('./utils/errorHandler');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(helmet());
app.use(middleware.jsonParser);
app.use(middleware.urlencodedParser);
app.use(middleware.corsMiddleware);
app.use(middleware.setHeadersMiddleware);
app.use(middleware.logRequestsMiddleware);

// Routes
app.use('/api', clientRoutes); // Используем префикс '/api'

// Error handling middleware
app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
