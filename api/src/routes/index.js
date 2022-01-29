const { Router } = require('express');
const dogsRoute = require('./dogs')
const temperamentoRoute = require('./temperamento')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// aqui se coloca los middlewares que redireccionan hacia las rutas correctas
router.use('/dogs',dogsRoute)
router.use('/temperament', temperamentoRoute)


module.exports = router;
