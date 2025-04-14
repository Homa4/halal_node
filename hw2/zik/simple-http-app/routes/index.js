const { Route } = require('./routeBuilder');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

module.exports = [
  Route('GET', '/', homeController.home),
  Route('GET', '/about', homeController.about),
  Route('POST', '/submit', homeController.submit),

  Route('GET', '/users/:id', userController.getUser),
  Route('POST', '/users', userController.createUser)
];