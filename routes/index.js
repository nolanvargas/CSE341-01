const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/url', myController.getNames);

module.exports = routes;
