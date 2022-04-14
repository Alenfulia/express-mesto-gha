const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62582011c28dc6ede23d6e30',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
