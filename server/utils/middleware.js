const bodyParser = require('body-parser');

// Middleware для парсинга JSON и URL-encoded форм
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Middleware для обработки CORS
const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

// Установка заголовков для ответа
const setHeadersMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
};

// Логирование входящих запросов
const logRequestsMiddleware = (req, res, next) => {
  console.log(`Полученный ${req.method} запрос на ${req.url}`);
  next();
};

module.exports = {
  jsonParser,
  urlencodedParser,
  corsMiddleware,
  setHeadersMiddleware,
  logRequestsMiddleware,
};
