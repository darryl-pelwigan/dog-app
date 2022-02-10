const express = require('express');
const dogs = require('../routes/dogs');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/dogs', dogs);
};
