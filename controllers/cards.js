const Card = require('../models/card');
const { errorsHandler, ERROR_NOT_FOUND } = require('../utils/utils');

// Получение карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => errorsHandler(err, res));
};

// Добавление карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => errorsHandler(err, res));
};

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
      }
      res.status(200).send(card);
    })
    .catch((err) => errorsHandler(err, res));
};

// Лайк карточки
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
      }
      res.status(200).send(card);
    })
    .catch((err) => errorsHandler(err, res));
};

// Снятие лайка с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => errorsHandler(err, res));
};
