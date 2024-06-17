const AppError = require('./customErrors');

const errorHandler = (err, req, res, next) => {
  console.error('ERROR 💥', err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.isOperational ? err.message : 'Что-то пошло не так';

  res.status(statusCode).json({
    status: status,
    message: message,
  });
};

module.exports = errorHandler;
