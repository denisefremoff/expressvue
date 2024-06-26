const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON и URL-encoded форм
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware перед объявлением маршрутов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ всем доменам
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Установка заголовков для ответа
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Логирование входящих запросов
app.use((req, res, next) => {
  console.log(`Полученный ${req.method} запрос на ${req.url}`);
  next();
});

// Маршрут для получения всех приветствий
app.get('/clients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM clients ORDER BY id ASC');
    console.log('Данные из базы данных:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});


// Маршрут для добавления нового клиента
app.post('/clients', async (req, res) => {
  const { name, email, contract_number, contract_term, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clients (name, email, contract_number, contract_term, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, contract_number, contract_term, password]
    );
    console.log('Новый клиент добавлен:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Маршрут для получения данных конкретного клиента
app.get('/clients/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [clientId]);
    if (rows.length === 0) {
      res.status(404).send('Клиент не найден');
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
