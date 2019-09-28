const { Router } = require('express');

const NewsController = require('./app/controllers/NewsController');

const routes = new Router();

routes.get('/list', NewsController.list);
routes.get('/slide', NewsController.slide);

module.exports = routes;