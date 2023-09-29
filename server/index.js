"use strict";

const express = require("express");
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require("path");
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(express.static(path.resolve(__dirname, "..", "node_modules")));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8001;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});

const users = {
  'd.dorofeev@corp.mail.ru': {
    email: 'd.dorofeev@corp.mail.ru',
    password: 'password',
    age: 21,
  },
  's.volodin@corp.mail.ru': {
    email: 's.volodin@corp.mail.ru',
    password: 'password',
    age: 25,
  },
  'aleksandr.tsvetkov@corp.mail.ru': {
    email: 'aleksandr.tsvetkov@corp.mail.ru',
    password: 'password',
    age: 28,
  },
  'a.ostapenko@corp.mail.ru': {
    email: 'a.ostapenko@corp.mail.ru',
    password: 'password',
    age: 21,
  },
};
const ids = {};

app.post('/login',  (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id});
});

app.get('/me', (req, res) => {
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  res.json(users[email]);
});

app.get('/content', (req, res) => {
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  return res.status(200).end();
});
