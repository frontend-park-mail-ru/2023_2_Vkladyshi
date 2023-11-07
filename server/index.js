'use strict';

const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const multer = require('multer');

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
    credentials: true
  })
);

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Укажите папку назначения, где будет сохранен файл
    cb(null, '/icons/');
  },
  filename: function (req, file, cb) {
    // Укажите имя файла, который был загружен
    cb(null, file.originalname);
  }
});

const findFilmByTitle = (films, title) => {
  // eslint-disable-next-line guard-for-in
  for (const filmKey in films) {
    const film = films[filmKey];
    if (film.title === title) {
      return film;
    }
  }
  return null;
};

const actor = {
  status: 200,
  body: {
    isHeader: true,
    poster: '/icons/star.png',
    name: 'Сильвестр Сталлоне',

    genres: ['боевик', 'драма', 'триллер'],
    career: ['Актер', 'Сценарист', 'Продюсер', 'Режиссер'],
    country: 'США',
    birth_date: '1946',
    headersItems: ['Биография', 'Фото'],
    info_text: 'Родился 6 июля 1946 года в Нью-Йорке. Его отец, парикмахер Фрэнк Сталлоне-старший (англ. Frank Stallone, Sr., 1919—2011), — иммигрант из Сицилии; мать, Жаклин Лейбофиш (1921—2020).',
    number: '8 млн.'
  }
};

const comments = {
  status: 200,
  body: [
    {
      name: 'Login_User',
      rating: 3,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 4,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 7,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 8,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 9,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 10,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 1,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
    {
      name: 'Login_User',
      rating: 2,
      text: 'Фильм отличный 11/10',
      film_id: 7,
      film_name: 'film'
    },
  ]
};

const films = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        film_id: 10,
        poster: '/icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 4.5
      },
      film2: {
        film_id: 9,
        poster: '/icons/Poster.jpg',
        title: 'film_2',
        rating: 4.1
      },
      film3: {
        film_id: 7,
        poster: '/icons/Poster.jpg',
        title: 'film',
        number: 12467,
        rating: 4.5,
        genre: 'Боевики',
        country: 'США',
        year: '2023',
        actors: [{ actor_id: 1, actor_name: 'Джейсон Стэйтем' }, { actor_id: 2, actor_name: 'Фифти Сент' }, { actor_id: 3, actor_name: 'Меган Фокс' }, { actor_id: 4, actor_name: 'Сильвестр Сталлоне' }],
        info_text: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.'
      },
      film9: {
        film: {
          id: 10,
          title: 'film',
          poster: '/icons/Poster.jpg',
          release_date: '2023-12-30',
          country: 'USA',
          mpaa: 'R',
          info_text: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.'
        },
        genre: [{ id: 0, title: 'war' }],
        rating: 10,
        number: 11,
        actors: [{ id_actor: 1, actor_name: 'Джейсон Стэйтем' }, { id_actor: 2, actor_name: 'Фифти Сент' }, { id_actor: 3, actor_name: 'Меган Фокс' }, { id_actor: 4, actor_name: 'Сильвестр Сталлоне' }],
        directors: [{ directors_id: 1, directors_name: 'POHUI' }]
      },
      film4: {
        film_id: 7,
        poster: '/icons/Poster.jpg',
        title: 'film_4',
        rating: 3
      },
      film5: {
        film_id: 5,
        poster: '/icons/Poster.jpg',
        title: 'film_1',
        rating: 4.5
      },
      film6: {
        film_id: 3,
        poster: '/icons/Poster.jpg',
        title: 'film_211111111111111111111111',
        rating: 4.1
      },
      film7: {
        film_id: 2,
        poster: '/icons/Poster.jpg',
        title: 'film_3',
        rating: 4.5
      },
      film8: {
        film_id: 1,
        poster: '/icons/Poster.jpg',
        title: 'film_4',
        rating: 3
      }
    }
  }
};

const film = {
  status: 200,
  body: {
    film: {
      id: 10,
      title: 'film',
      poster: '/icons/Poster.jpg',
      release_date: '2023-12-30',
      country: 'USA',
      mpaa: 'R',
      info_text: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.'
    },
    genre: [{ id: 0, title: 'war' }],
    rating: 10,
    number: 11,
    actors: [{ id_actor: 1, actor_name: 'Джейсон Стэйтем' }, { id_actor: 2, actor_name: 'Фифти Сент' }, { id_actor: 3, actor_name: 'Меган Фокс' }, { id_actor: 4, actor_name: 'Сильвестр Сталлоне' }],
    directors: [{ directors_id: 1, directors_name: 'POHUI' }]
  }
};

// eslint-disable-next-line camelcase
const films_tags = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        poster: '../../icons/bastards.jpg',
        title: 'film_1 111110000000000000000000000000000000000000000001',
        rating: 1,
        film_id: 11
      },
      film2: {
        poster: '/',
        title: 'film_2',
        rating: 2,
        film_id: 15
      }
    }
  }
};

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});

const users = {
  dorofeef: {
    email: 'd.dorofeev@corp.mail.ru',
    password: 'Password1',
    age: 21
  },
  volodin: {
    email: 'Password2@mail.ru',
    password: 'Password1',
    age: 25
  },
  login: {
    email: 'email@mail.ru',
    password: 'Password1',
    age: 28
  },
  ostapenko: {
    email: 'a.ostapenko@corp.mail.ru',
    password: 'Password1',
    age: 21
  }
};
const ids = {};

const settings = {
  status: 200,
  body: {
    login: 'login_11',
    email: '1111@1111',
    photo: '/icons/star.png'
  }
};

app.use(express.static('dist'));

app.use('/login', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
  }
});
app.use('/signin', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
    return;
  }

  const password = req.body.password;
  const login = req.body.login;

  res.header('Content-Security-Policy', "img-src 'self'");

  if (!password || !login) {
    return res.status(200).json({ status: 401 });
  }
  if (!users[login] || users[login].password !== password) {
    return res.status(200).json({ status: 401 });
  }

  const id = uuid();
  ids[id] = login;

  res.cookie('session_id', id, {
    expires: new Date(Date.now() + 1000 * 60 * 10)
  });

  // res.cookie('session_id', { httpOnly: true });
  res.status(200).json({ status: 200 });
});

app.use('/registration', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
  }
});

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);
app.get('/api/v1/csrf', (req, res) => {
  res.set('x-csrf-token', req.csrfToken());
  return res.status(200).json({
    status: 200
  });
});

app.use('/signup', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
    return;
  }

  const password = req.body.password;
  const login = req.body.login;

  if (!password || !login) {
    return res.status(200).json({ status: 400 });
  }
  if (users[login] !== undefined) {
    return res.status(200).json({
      status: 409
    });
  }

  users[login] = { login, password, age: 20 };

  const id = uuid();
  ids[id] = login;


  res.status(200).json({ status: 200 });
  return res;
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

app.get('/selection', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/settings', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/settings', (req, res) => {
  return res.status(200).json(settings);
});

app.post('/api/v1/settings', (req, res) => {
  console.log(req);
});

app.get('/actor', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  res.status(200).json({ actor }).end();
});

app.get('/actor/:actor_id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/films/:collection_id', (req, res) => {
  const collectionId = req.query.collection_id;
  if (collectionId !== 'new') {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.status(404).send('Страница не найдена');
  }
});

app.get('/film/:filmId', (req, res) => {
  const filmId = req.query.filmId;
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/v1/actor', (req, res) => {
  return res.status(200).json(actor);
});

app.use('/api/v1/films', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  if (req.query.collection_id !== 'new') {
    return res.status(200).json(films_tags);
  }
  return res.status(200).json(films);
});

app.use('/api/v1/film', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  // const filmTitle = 'film';
  // const film = findFilmByTitle(films.body.films.film9, filmTitle);
  return res.status(200).json({ body: films.body.films.film9 });
});

app.get('/comments/search', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/comment/search', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }

  const page = parseInt(req.query.page) || 1; // Получаем значение параметра "page" из запроса, по умолчанию 1
  const perPage = parseInt(req.query.per_page) || 10; // Получаем значение параметра "per_page" из запроса, по умолчанию 10

  const startIndex = (page - 1) * perPage; // Вычисляем индекс начала комментариев на текущей странице
  const endIndex = startIndex + perPage; // Вычисляем индекс конца комментариев на текущей странице

  const paginatedComments = comments.body.slice(startIndex, endIndex); // Получаем комментарии для текущей страницы

  const response = {
    status: 200,
    body: paginatedComments
  };

  res.status(200).json(response);
  return res;
});





/*
*   const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
*
* */
