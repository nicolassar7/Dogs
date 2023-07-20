const { Router } = require('express');

const getTemperaments = require('../controllers/getTemperaments')

const tempRouter = Router();

tempRouter.get('/', getTemperaments);

module.exports = tempRouter;