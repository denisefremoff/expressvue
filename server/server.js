const path = require("path");
require("dotenv").config({
  override: true,
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", router);
// Логирование входящих запросов
app.use((req, res, next) => {
  console.log(`Полученный ${req.method} запрос на ${req.url}`);
  next();
});

// Маршрут для добавления нового клиента
// app.post("/clients", async (req, res) => {
//   const { name, email, contract_number, contract_term, password } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO clients (name, email, contract_number, contract_term, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [name, email, contract_number, contract_term, password]
//     );
//     console.log("Новый клиент добавлен:", result.rows[0]);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Ошибка при выполнении запроса к базе данных:", err);
//     res.status(500).send("Ошибка сервера");
//   }
// });

// Маршрут для получения данных конкретного клиента
// app.get("/clients/:id", async (req, res) => {
//   const clientId = req.params.id;
//   try {
//     const { rows } = await pool.query("SELECT * FROM clients WHERE id = $1", [
//       clientId,
//     ]);
//     if (rows.length === 0) {
//       res.status(404).send("Клиент не найден");
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (err) {
//     console.error("Ошибка при выполнении запроса к базе данных:", err);
//     res.status(500).send("Ошибка сервера");
//   }
// });

//запуск сервера

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
start();
