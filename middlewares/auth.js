/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // Достаём авторизационный заголовок
  const { authorization } = req.headers;

  // Убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnathorizedError('Необходима авторизация.');
  }

  // Извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // Отправим ошибку, если не получилось
    throw new UnathorizedError('Необходима авторизация.');
  }

  req.user = payload; // Записываем пейлоуд в объект запроса

  next(); // Пропускаем запрос дальше
};
