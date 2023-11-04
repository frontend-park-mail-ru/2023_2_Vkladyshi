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

const findFilmByTitle = (films, title) => {
  // eslint-disable-next-line guard-for-in
  for (const filmKey in films) {
    const film = films[filmKey];
    if (film.title === title) {
      return film;
    }
  }
  return null;
}

const actor = {
  status: 200,
  body: {
    isHeader: true,
    poster_href: '/icons/star.png',
    name: 'Сильвестр Сталлоне',

    genres: ['боевик', 'драма', 'триллер'],
    career: ['Актер', 'Сценарист', 'Продюсер', 'Режиссер'],
    country: 'США',
    year: '1946',
    headersItems: ['Биография', 'Фото'],
    infoText: 'Родился 6 июля 1946 года в Нью-Йорке. Его отец, парикмахер Фрэнк Сталлоне-старший (англ. Frank Stallone, Sr., 1919—2011), — иммигрант из Сицилии; мать, Жаклин Лейбофиш (1921—2020).',
    number: '8 млн.',
  }
}

const films = {
  status: 200,
  body: {
    collection_name: 'Новинки',
    films: {
      film1: {
        filmId: 10,
        poster_href: '../../icons/bastards.jpg',
        title: 'film_1 111111',
        rating: 4.5,
      },
      film2: {
        filmId: 9,
        poster_href: '../../icons/Poster.jpg',
        title: 'film_2',
        rating: 4.1,
      },
      film3: {
        filmId: 7,
        poster_href: '../../icons/Poster.jpg',
        title: 'film',
        number: 12467,
        rating: 4.5,
        genre: 'Боевики',
        country: 'США',
        year: '2023',
        actors: [{ actor_id: 1 ,actorName: 'Джейсон Стэйтем'}, { actor_id: 2 ,actorName: 'Фифти Сент'}, { actor_id: 3 ,actorName:'Меган Фокс' }, { actor_id: 4 ,actorName:'Сильвестр Сталлоне'}],
        infoText: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.',
    },
      film4: {
        filmId: 7,
        poster_href: '../../icons/Poster.jpg',
        title: 'film_4',
        rating: 3,
      },
      film5: {
        filmId: 5,
        poster_href: '../../icons/Poster.jpg',
        title: 'film_1',
        rating: 4.5,
      },
      film6: {
        filmId: 3,
        poster_href: '../../icons/Poster.jpg',
        title: 'film_211111111111111111111111',
        rating: 4.1,
      },
      film7: {
        filmId: 2,
        poster_href: '../../icons/Poster.jpg',
        title: 'film_3',
        rating: 4.5,
      },
      film8: {
        filmId: 1,
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
        filmId: 11,
      },
      film2: {
        poster_href: '/',
        title: 'film_2',
        rating: 2,
        filmId: 15,
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

app.use(express.static('dist'));


app.use('/login', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
  }
})
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
    expires: new Date(Date.now() + 1000 * 60 * 10 )
  });

  // res.cookie('session_id', { httpOnly: true });
  res.status(200).json({ status: 200 });
});


app.use('/registration', (req, res) => {
  if (req.method === 'GET') {
    res.sendFile(__dirname + '/index.html');
  }
})

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
    return
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
    return
  }
  const filmTitle = 'film';
  const film = findFilmByTitle(films.body.films, filmTitle);
  return res.status(200).json({body : film});
});

