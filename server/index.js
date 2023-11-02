'use strict';

const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.ts');

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(
  cors({
    origin: ['http://localhost:8001', 'http://127.0.0.1:8001'],
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8001;

const getActorDescrition = {
  status: 200,
  body: {
    isHeader: true,
    header: 'Сильвестр Сталлоне',
    subHeader: 'Sylvester Stallone',
    number: '8 млн.',
    headersItems: ['Биография', 'Фото'],
    infoText: 'Родился 6 июля 1946 года в Нью-Йорке. Его отец, парикмахер Фрэнк Сталлоне-старший (англ. Frank Stallone, Sr., 1919—2011), — иммигрант из Сицилии; мать, Жаклин Лейбофиш (1921—2020).',
    row: [
      {
        rowName: 'Карьера:',
        rowText: 'Актер, Сценарист, Продюсер, Режиссер'
      },
      {
        rowName: 'Рост:',
        rowText: '1,77 м'
      },
      {
        rowName: 'Дата рождения:',
        rowText: '6 июля 1946 - 77 лет'
      },
      {
        rowName: 'Место рождения:',
        rowText: 'Нью-Йорк, США'
      },
      {
        rowName: 'Жанры:',
        rowText: 'боевик, драма, триллер'
      }
    ]
  }
};


const films = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        poster_href: '../../icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 4.5,
      },
      film2: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_2',
        rating: 4.1,
      },
      film3: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_3',
        rating: 4.5,
      },
      film4: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_4',
        rating: 3,
      },
      film5: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_1',
        rating: 4.5,
      },
      film6: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_2',
        rating: 4.1,
      },
      film7: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_3',
        rating: 4.5,
      },
      film8: {
        poster_href: '../../icons/Poster.jpg',
        title: 'film_4',
        rating: 3,
      },
    },
  },
};

// eslint-disable-next-line camelcase
const films_tags = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        poster_href: '../../icons/bastards.jpg',
        title: 'film_1 111110000000000000000000000000000000000000000001',
        rating: 1,
      },
      film2: {
        poster_href: '/',
        title: 'film_2',
        rating: 2,
      },
    },
  },
};

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});

const users = {
  dorofeef: {
    email: 'd.dorofeev@corp.mail.ru',
    password: 'Password1',
    age: 21,
  },
  volodin: {
    email: 'Password2@mail.ru',
    password: 'Password1',
    age: 25,
  },
  login: {
    email: 'email@mail.ru',
    password: 'Password1',
    age: 28,
  },
  ostapenko: {
    email: 'a.ostapenko@corp.mail.ru',
    password: 'Password1',
    age: 21,
  },
};
const ids = {};

const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
// other app.use() options ...
app.use(
  expressCspHeader({
    policies: {
      'default-src': [expressCspHeader.NONE],
      'img-src': [expressCspHeader.SELF],
    },
  })
);

app.post('/signin', (req, res) => {
  const password = req.body.password;
  const login = req.body.login;

  if (!password || !login) {
    return res.status(200).json({ status: 401 });
  }
  if (!users[login] || users[login].password !== password) {
    return res.status(200).json({ status: 401 });
  }

  const id = uuid();
  ids[id] = login;

  res.cookie('session_id', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });

  // res.cookie('session_id', { httpOnly: true });
  res.status(200).json({ status: 200 });
});

app.post('/signup', (req, res) => {
  const password = req.body.password;
  const login = req.body.login;

  if (!password || !login) {
    return res.status(200).json({ status: 400 });
  }
  if (users[login] !== undefined) {
    return res.status(200).json({
      status: 409,
    });
  }

  users[login] = { login, password, age: 20 };

  const id = uuid();
  ids[id] = login;

  // res.cookie('session_id', id, {
  //   expires: new Date(Date.now() + 1000 * 60 * 10),
  // });
  res.status(200).json({ status: 200 });
  return res;
});

app.get('/api/v1/films', (req, res) => {
  if (req.query.collection_id !== 'new') {
    return res.status(200).json(films_tags);
  }
  return res.status(200).json(films);
});

app.get('/authcheck', (req, res) => {
  const id = req.cookies.session_id;
  const login = ids[id];
  if (!login || !users[login]) {
    return res.status(200).json({ status: 401 }).end();
  }

  return res.status(200).json({ status: 200 }).end();
});

app.get('/logout', (req, res) => {
  const id = req.cookies.session_id;
  delete ids[id];

  return res.status(200).json({ status: 200 });
});

app.get('/api/v1/actor', (req, res) => {
  return res.status(200).json({ getActorDescrition });
});

