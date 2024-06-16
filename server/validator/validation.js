const { check, body, validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js");

exports.validateRegistration = [
  check("email").not().isEmpty().withMessage("Поле email не может быть пустым"),
  check("email").isString().withMessage("Поле должен быть строкой"),
  check("email").isEmail().withMessage("Некорректный email"),
  check("email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|su)$/)
    .withMessage(
      "Должен содержать только латинские буквы и цифры. Например: 9XUZMMM@example.com"
    ),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Поле password не может быть пустым"),
  check("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Пароль дожен содержать от 6 до 32 символов"),
  check("password").isString().withMessage("Пароль должен быть строкой"),
  check("password")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/
    )
    .withMessage(
      "Пароль должен содержать только латинские буквы, хотя бы одну цифру, одну букву в верхнем регистре и одну букву в нижнем регистре"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest(
          "Ошибка валидации полей регистрации",
          errors.array()
        )
      );
    }
    next();
  },
];
exports.validateLogin = [
  check("email").not().isEmpty().withMessage("Поле email не может быть пустым"),
  check("email").isString().withMessage("Поле должен быть строкой"),
  check("email").isEmail().withMessage("Некорректный email"),
  check("email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|su)$/)
    .withMessage(
      "Адрес электронной содержать только латинские буквы и цифры. Пример: 9XUZMMM@example.com"
    ),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Поле password не может быть пустым"),
  check("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Пароль дожен содержать от 6 до 32 символов"),
  check("password").isString().withMessage("Пароль должен быть строкой"),
  check("password")
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/
    )
    .withMessage(
      "Пароль должен содержать только латинские буквы хотя бы одну цифру, одну букву в верхнем регистре и одну букву в нижнем регистре"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest(
          "Ошибка валидации полей авторизации",
          errors.array()
        )
      );
    }
    next();
  },
];

exports.validateEmail = [
  check("email").not().isEmpty().withMessage("Поле email не может быть пустым"),
  check("email").isString().withMessage("Поле должен быть строкой"),
  check("email").isEmail().withMessage("Некорректный email"),
  check("email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|su)$/)
    .withMessage(
      "Должен содержать только латинские буквы и цифры. Например: 9XUZMMM@example.com"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest("Ошибка валидации поля email", errors.array())
      );
    }
    next();
  },
];
