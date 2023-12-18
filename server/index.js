/* eslint-disable require-jsdoc */
'use strict';

const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const multer = require('multer');

const ws = require('ws');

const uuid = require('uuid').v4;
const path = require('path');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.ts');

const admin = require('firebase-admin');
const serviceAccount = require('./vkladishi-1114b-firebase-adminsdk-bsvk2-a19d858f15.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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

const csat = {
  status: 200,
  body: {
    statistics: [
      { number: 1, count: 15 },
      { number: 2, count: 20 },
      { number: 3, count: 2 },
      { number: 4, count: 10 },
      { number: 5, count: 11 },
      { number: 6, count: 91 },
      { number: 7, count: 11 },
      { number: 8, count: 129 },
      { number: 9, count: 6 },
      { number: 10, count: 0 }
    ]
  }
};

const actor = {
  status: 200,
  body: {
    isHeader: true,
    poster_href: '/icons/star.png',
    name: 'Сильвестр Сталлоне',

    genres: ['боевик', 'драма', 'триллер'],
    career: [{ id: 0, profession: 'Актер' }],
    country: 'США',
    birthday: '1946',
    headersItems: ['Биография', 'Фото'],
    info_text:
      'Родился 6 июля 1946 года в Нью-Йорке. Его отец, парикмахер Фрэнк Сталлоне-старший (англ. Frank Stallone, Sr., 1919—2011), — иммигрант из Сицилии; мать, Жаклин Лейбофиш (1921—2020).',
    number: '8 млн.'
  }
};

const calendar = {
  status: 200,
  body: {
    monthName: 'Декабрь 2023',
    monthText: 'Календарь релизов',
    currentDay: 13,
    days: [
      { dayNumber: 14, dayNews: 'Kostolom', id: 10 },
      { dayNumber: 21, dayNews: 'Night', id: 5 }
    ]
  }
};

const comments = {
  status: 200,
  body: {
    comment: [
      {
        name: 'Login_User',
        rating: 3,
        text: 'Фильм отличный 11/10',
        film_id: 7,
        film_name: 'film',
        photo: '/icons/star.png'
      },
      {
        name: 'Login_User',
        rating: 4,
        text: 'Фильм отличный 11/10',
        film_id: 7,
        film_name: 'film'
      }
    ]
  }
};

const favoriteFilms = {
  status: 200,
  body: [
    {
      id: 3,
      poster: '/icons/bastards.jpg',
      title: 'film_1 111111',
      rating: 1
    },
    {
      id: 8,
      poster: '/icons/Poster.jpg',
      title: 'film_2',
      rating: 2
    },
    {
      id: 4,
      poster: '/icons/bastards.jpg',
      title: 'film_1 111111',
      rating: 3
    },
    {
      id: 5,
      poster: '/icons/Poster.jpg',
      title: 'film_2',
      rating: 4
    },
    {
      id: 30,
      poster: '/icons/bastards.jpg',
      title: 'film_1 111111',
      rating: 5
    },
    {
      id: 10,
      poster: '/icons/Poster.jpg',
      title: 'film_2',
      rating: 6
    }
  ]
};

const favoriteActors = {
  status: 200,
  body: {
    actors: [
      {
        actor_id: 1,
        actor_name: 'Джейсон Стэйтем',
        actor_photo: '/icons/star.png'
      },
      { actor_id: 2, actor_name: 'Фифти Сент', actor_photo: '/icons/star.png' },
      { actor_id: 3, actor_name: 'Меган Фокс', actor_photo: '/icons/star.png' },
      {
        actor_id: 4,
        actor_name: 'Сильвестр Сталлоне',
        actor_photo: '/icons/star.png'
      }
    ]
  }
};

const films = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: [
      {
        id: 3,
        poster: '/icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 1
      },
      {
        id: 8,
        poster: '/icons/Poster.jpg',
        title: 'film_2',
        rating: 2
      },
      {
        id: 4,
        poster: '/icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 3
      },
      {
        id: 5,
        poster: '/icons/Poster.jpg',
        title: 'film_2',
        rating: 4
      },
      {
        id: 30,
        poster: '/icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 5
      },
      {
        id: 10,
        poster: '/icons/Poster.jpg',
        title: 'film_2',
        rating: 6
      }
    ]
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
      info: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.'
    },
    genre: [{ id: 0, title: 'Военные' }, { id: 2, title: 'Боевики' }],
    rating: 10,
    number: 11,
    actors: [
      {
        actor_id: 1,
        actor_name: 'Джейсон Стэйтем',
        actor_photo: '/icons/star.png'
      },
      { actor_id: 2, actor_name: 'Фифти Сент', actor_photo: '/icons/star.png' },
      { actor_id: 3, actor_name: 'Меган Фокс', actor_photo: '/icons/star.png' },
      {
        actor_id: 4,
        actor_name: 'Сильвестр Сталлоне',
        actor_photo: '/icons/star.png'
      }
    ],
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
        poster: '/icons/bastards.jpg',
        title: 'Бесславные ублюдки',
        rating: 8,
        film_id: 11
      },
      film3: {
        poster: '/icons/bastards.jpg',
        title: 'film_1 111110000000000000000000000000000000000000000001',
        rating: 1,
        film_id: 11
      },
      film4: {
        poster: '/icons/bastards.jpg',
        title: 'film_1',
        rating: 1,
        film_id: 11
      },
      film5: {
        poster: '/icons/bastards.jpg',
        title: 'film_1 111',
        rating: 1,
        film_id: 11
      },
      film6: {
        poster: '/icons/bastards.jpg',
        title: 'film_1 111110000000000000000000000000000000000000000001',
        rating: 1,
        film_id: 11
      }
    }
  }
};

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});

const users = {
  Admin: {
    email: 'Admin.mail.ru',
    password: 'Admin123',
    age: 100
  },
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
  Andrey111: {
    email: 'Andrey@111',
    password: 'Andrey111'
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
    login: 'Andrey111',
    email: 'Andrey@111',
    photo: '/icons/star.png',
    birthday: '2010-01-01'
  }
};

app.get(express.static('dist'));

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
    expires: new Date(Date.now() + 1000 * 60 * 100)
  });

  // res.cookie('session_id', { httpOnly: true });
  res.status(200).json({ status: 200 });
});

app.use('/registration', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
  }
});

app.get('/api/v1/csrf', (req, res) => {
  return res.status(200).json({
    status: 200
  });
});

app.get('/api/v1/favorite/film/add', (req, res) => {
  return res.status(200).json({
    status: 200
  });
});

app.get('/api/v1/favorite/actor/add', (req, res) => {
  return res.status(200).json({
    status: 200
  });
});

app.get('/api/v1/favorite/actor/remove', (req, res) => {
  return res.status(200).json({
    status: 200
  });
});

app.get('/api/v1/favorite/film/remove', (req, res) => {
  return res.status(200).json({
    status: 200
  });
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/admin/csat', (req, res) => {
  return res.status(200).json(csat);
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

  return res.status(200).json({ status: 200, body: { role: 'super1', login: 'volodin' } }).end();
});

app.get('/logout', (req, res) => {
  const id = req.cookies.session_id;
  delete ids[id];

  return res.status(200).json({ status: 200 });
});

app.get('/selection', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/watchlist/films', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/watchlist/actors', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/favorite/films', (req, res) => {
  return res.status(200).json(favoriteFilms);
});

app.get('/api/v1/favorite/actors', (req, res) => {
  return res.status(200).json(favoriteActors);
});
app.get('/settings', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/settings', (req, res) => {
  return res.status(200).json(settings);
});

app.post('/api/v1/add/film', (req, res) => {
  return res.status(200).json({ status: 200 });
});

const formidableMiddleware = require('express-formidable');

app.use(
  formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: '/home/andr/go',
    multiples: true // req.files to be arrays of files
  })
);

app.post('/api/v1/settings', (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.fields);
  console.log('KEEKK/SETT', req.fields.password);

  if (req.fields.password === 'Andrey111') {
    res.status(200).json({ status: 409 }).end();
    return;
  }

  res.status(200).json({ status: 200 }).end();
});

app.get('/actor', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  res.status(200).json({ actor }).end();
});

app.get('/actor/:actor_id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/films', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
//
// app.get('/actors', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/films/:collection_id', (req, res) => {
  const collectionId = req.query.collection_id;
  if (collectionId !== 0) {
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
// /api/v1/find
app.use('/api/v1/find', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  if (req.query.collection_id !== 0) {
    return res.status(200).json(films);
  }
  return res.status(200).json(films);
});

app.use('/api/v1/film', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  return res.status(200).json({ body: film.body, status: film.status });
});

app.use('/api/v1/search/film', (req, res) => {
  res.status(200).json({ status: 200 }).end();
});

app.use('/films', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.status(200).json({ status: 200 }).end();
});

app.use('/api/v1/search/actor', (req, res) => {
  return res
    .status(200)
    .json({ body: favoriteActors.body, status: favoriteActors.status });
});

app.get('/comments', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments/:comments', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/films', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/api/v1/comment', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  //
  // const page = parseInt(req.query.page) || 1; // Получаем значение параметра "page" из запроса, по умолчанию 1
  // const perPage = parseInt(req.query.per_page) || 10; // Получаем значение параметра "per_page" из запроса, по умолчанию 10
  //
  // const startIndex = (page - 1) * perPage; // Вычисляем индекс начала комментариев на текущей странице
  // const endIndex = startIndex + perPage; // Вычисляем индекс конца комментариев на текущей странице
  //
  // const paginatedComments = comments.body.slice(startIndex, endIndex); // Получаем комментарии для текущей страницы

  // const response = {
  //   status: 200,
  //   body: paginatedComments,
  // };

  res.status(200).json(comments);
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

app.use('/api/v1/calendar', (req, res) => {
  return res.status(200).json(calendar);
});

// app.use('/api/v1/find', (req, res) => {
//   return res.status(200).json(films);
// });

app.use('/api/v1/search/actors', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  return res.status(200).json(favoriteActors);
});

app.use('/actors', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/v1/films', (req, res) => {
  const secFetchSite = req.headers['sec-fetch-site'];
  if (!secFetchSite) {
    res.sendFile(__dirname + '/index.html');
    return;
  }
  if (req.query.collection_id !== 0) {
    return res.status(200).json(films);
  }
  return res.status(200).json(films);
});

app.use('/api/v1/subscribe/calendar', (req, res) => {
  console.log(req['subscribeFilmID']);
  console.log('calendar_subscribe');
  return res.status(200).json({ status: 200, body: { notificationID: 11, subscribe: true } });
});

app.use('/api/v1/user/subscribePush', (req, res) => {
  const notificationPayload = {
      title: 'Заголовок',
      body: 'Текст'
  };

  return res.status(200).json({ status: 200, body:notificationPayload });
});

/// /------------------------------------------------------------------

const port_ws = process.env.PORT || 8003;
const wss = new ws.Server(
  {
    port: port_ws
  },
  () => console.log(`WSS started on ${port_ws}`)
);

const premieresFilmsBD = [
  {
    id: 11,
    name: 'Дом дракона',
    poster_hor:
      'https://upload.wikimedia.org/wikipedia/ru/6/67/%D0%94%D0%BE%D0%BC%D0%94%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg',
    rating: -1.8,
    ticket_link: 'https://rutracker.org/forum/viewtopic.php?t=6249419',
    prod_date: '2022.11.12'
  },
  {
    id: 10,
    name: 'С широко закрытыми глазами',
    poster_hor:
      'https://upload.wikimedia.org/wikipedia/ru/a/aa/EyesWideShutPoster.jpg',
    rating: 7.8,
    ticket_link: 'https://www.kinopoisk.ru/film/3608/',
    prod_date: '2022.11.05'
  }
];

const timer = setInterval(
  () =>
    broadcastMessage({
      action: 'ANONS_FILM',
      payload:
        premieresFilmsBD[Math.floor(Math.random() * premieresFilmsBD.length)]
    }),
  5000
);

wss.on('connection', function connection (ws, request, client) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    switch (message.action) {
      case 'CLOSE':
        clearInterval(timer);
        break;
    }
  });
});

/**
 *
 * @param message
 * @param id
 */
function broadcastMessage (message, id) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
