"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(express.static(path.resolve(__dirname, "..", "node_modules")));

const port = process.env.PORT || 8001;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});
