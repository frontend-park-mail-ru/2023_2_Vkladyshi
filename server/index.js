"use strict";

const films = {
  collection: {
    collectionName: "Боевики",
    films: {
      film1: {
        poster_href: "../../icons/Poster.jpg",
        name: "film_1",
        rating: 4.5,
      },
      film2: {
        poster_href: "../../icons/Poster.jpg",
        name: "film_2",
        rating: 4.1,
      },
      film3: {
        poster_href: "../../icons/Poster.jpg",
        name: "film_3",
        rating: 4.5,
      },
      film4: {
        poster_href: "../../icons/Poster.jpg",
        name: "film_4",
        rating: 3,
      },
      film5: {
        poster_href: "../../icons/Poster.jpg",
        name: "film_5",
        rating: 2,
      },
    },
  },
};

const express = require("express");
const body = require("body-parser");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const uuid = require("uuid").v4;
const path = require("path");

const { Console } = require("console");
const e = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(express.static(path.resolve(__dirname, "..", "node_modules")));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8001;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});


let users = {
  'd.dorofeev@corp.mail.ru': {
    email: 'd.dorofeev@corp.mail.ru',
    password: 'Password1',
    age: 21,
  },
  's.volodin@corp.mail.ru': {
    email: 'Password2@mail.ru',
    password: 'Password1',
    age: 25,
  },
  'Password1@mail.ru': {
    email: 'Password1@mail.ru',
    password: 'Password1@mail.ru',
    age: 28,
  },
  'a.ostapenko@corp.mail.ru': {
    email: 'a.ostapenko@corp.mail.ru',
    password: 'Password1',
    age: 21,
  },
};
const ids = {};

app.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {

    return res.status(401).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(401).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie("podvorot", id, {
    expires: new Date(Date.now() + 1000 * 60 * 10),
  });
  res.status(200).json({ id });
});


app.post('/signup',  (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  console.log(password, email)

  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (users[email] !== undefined) {
    return res.status(409).json({error: 'Аккаунт с указанным электронным адресом уже существует'});
  }

  users[email] = {email: email, password: password, age: 20}

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id});
  return res
});


app.get('/me', (req, res) => {
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  res.json(users[email]);
});


app.get('/authorized', (req, res) => {
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  return res.status(200).end();
});

app.get('/content', (req, res) => {
  const id = req.cookies['podvorot'];

  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  return res.status(200).end();
});

app.post("/basket", (req, res) => {
  console.log("=============");
  console.log("Server sucess");
  console.log(req.body.genre_id);
  console.log("=============");

  switch (req.body.genre_id) {
    case 1:
      return res.status(200).json(films);
  }
  return res.status(401).end();
});
