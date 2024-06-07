const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
//const path = require('path');

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
app.get('/greetings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM greetings');
    console.log('Данные из базы данных:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Маршрут для создания нового message
app.post('/greetings', async (req, res) => {
  const { message } = req.body;
  console.log('Полученное сообщение:', message);
  if (!message) {
    return res.status(400).send({ error: 'Требуется сообщение' });
  }
  try {
    console.log(`Вставка сообщения в базу данных: ${message}`);
    const result = await pool.query('INSERT INTO greetings (message) VALUES ($1) RETURNING *', [message]);
    console.log('Добавлена запись:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error on insertion:', err);
    res.status(500).send('Server Error');
  }
});

// Маршрут для отображения HTML страницы
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});