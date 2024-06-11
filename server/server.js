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
