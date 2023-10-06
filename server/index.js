'use strict';

const films = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        poster_href: '../../icons/bastards.jpg',
        name: 'film_1 111111111111111111111111111111111111111111111111111111111111111111111111111',
        rating: 4.5,
      },
      film2: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_2',
        rating: 4.1,
      },
      film3: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_3',
        rating: 4.5,
      },
      film4: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_4',
        rating: 3,
      },
      film5: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_1',
        rating: 4.5,
      },
      film6: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_2',
        rating: 4.1,
      },
      film7: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_3',
        rating: 4.5,
      },
      film8: {
        poster_href: '../../icons/Poster.jpg',
        name: 'film_4',
        rating: 3,
      },
    },
  },
};

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8001;

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

app.post('/signin', (req, res) => {
  const password = req.body.password;
  const login = req.body.login;
  if (!password || !login) {
    return res.status(401).json({ error: 'Не указан E-Mail или пароль' });
  }
  if (!users[login] || users[login].password !== password) {
    return res.status(401).json({ error: 'Не верный E-Mail и/или пароль' });
  }

  const id = uuid();
  ids[id] = login;

  res.cookie('session_id', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });
  res.status(200).json({ id });
});

app.post('/signup', (req, res) => {
  const password = req.body.password;
  const login = req.body.login;

  if (!password || !login) {
    return res.status(400).json({ error: 'Не указан login или пароль' });
  }
  if (users[login] !== undefined) {
    return res.status(409).json({
      error: 'Аккаунт с указанным электронным адресом уже существует',
    });
  }

  users[login] = { login: login, password: password, age: 20 };

  const id = uuid();
  ids[id] = login;

  res.cookie('session_id', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });
  res.status(200).json({ id });
  return res;
});

app.get('/me', (req, res) => {
  const id = req.cookies['session_id'];
  const login = ids[id];
  if (!login || !users[login]) {
    return res.status(401).end();
  }

  res.json(users[login]);
});

app.get('/content', (req, res) => {
  const id = req.cookies['session_id'];
  const login = ids[id];
  if (!login || !users[login]) {
    return res.status(401).end();
  }

  return res.status(200).end();
});

app.get('/api/v1/films', (req, res) => {
  console.log(req.query);
  return res.status(200).json(films);
});

app.get('/authcheck', (req, res) => {
  const id = req.cookies['session_id'];
  const login = ids[id];
  if (!login || !users[login]) {
    return res.status(200).json({ status: 401 }).end();
  }

  return res.status(200).json({ status: 200 }).end();
});

app.get('/logout', (req, res) => {
  const id = req.cookies['session_id'];
  delete ids[id];

  return res.status(200).json({ status: 200 }).end();
});
