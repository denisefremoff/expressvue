// Тест на подключение к базе данных
app.get('/test', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS current_time');
    console.log('Тестовый запрос выполнен успешно. Текущее время в базе данных:', rows[0].current_time);
    res.json({ message: 'Тестовый запрос выполнен успешно', currentTime: rows[0].current_time });
  } catch (err) {
    console.error('Ошибка при выполнении тестового запроса:', err);
    res.status(500).send('Ошибка сервера');
  }
});