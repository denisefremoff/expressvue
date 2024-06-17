const { check } = require('express-validator');

const nameValidator = (value) => {
  const words = value.split(' ');
  if (words.length !== 3) {
    throw new Error('ФИО должно состоять ровно из трех слов');
  }
  const regex = /^[А-ЯЁ][а-яё]{1,14}$/u;
  words.forEach(word => {
    if (!regex.test(word)) {
      throw new Error('Каждое слово должно быть длиной от 2 до 15 символов, содержать только кириллические символы и начинаться с заглавной буквы');
    }
  });
  return true;
};

const emailValidator = (value) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|su)$/;
  if (!regex.test(value)) {
    throw new Error('Адрес электронной почты должен быть в допустимом формате, а домен - .com, .ru или .su');
  }
  if (value.length < 6 || value.length > 50) {
    throw new Error('Длина электронного письма должна составлять от 6 до 50 символов');
  }
  return true;
};

const contractNumberValidator = (value) => {
  const regex = /^[А-Яа-яA-Za-z0-9/-]+$/;
  if (!regex.test(value)) {
    throw new Error('Номер контракта должен содержать только кириллические и латинские символы, цифры, "/" и "-".');
  }
  return true;
};

const contractTermValidator = (value) => {
  if (!Number.isInteger(Number(value)) || Number(value) < 0) {
    throw new Error('Срок действия контракта должен быть целым числом и содержать значение 0 или выше');
  }
  return true;
};

const passwordValidator = (value, { req }) => {
  if (req.method === 'PATCH' && value.startsWith('$2a$')) {
    return true;
  }

  const regex = /^(?=.*[A-Z])(?=(?:.*\d){3,})(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(value)) {
    throw new Error('Пароль должен содержать не менее 8 символов, по крайней мере, одну заглавную букву, три цифры и один специальный символ');
  }
  return true;
};

const validateClient = [
  check('name').custom(nameValidator),
  check('email').custom(emailValidator),
  check('contract_number').custom(contractNumberValidator),
  check('contract_term').custom(contractTermValidator),
  check('password').custom(passwordValidator)
];

module.exports = {
  validateClient
};
