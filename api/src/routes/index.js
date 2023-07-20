const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dogRoutes');
const tempRouter = require('./tempRoutes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogRouter)
router.use("/temperaments", tempRouter)



module.exports = router;
