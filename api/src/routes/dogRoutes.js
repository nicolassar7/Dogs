const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controllers/getDogs');
const getDogByName = require('../controllers/getDogByName');
const createDog = require('../controllers/createDog');
const getDogByIdBreeds = require ('../controllers/getDogByIdBreeds')


const dogRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
dogRouter.get('/', getDogs);
dogRouter.get('/name', getDogByName);
dogRouter.get('/:id',getDogByIdBreeds);


dogRouter.post('/', createDog);




module.exports = dogRouter;
