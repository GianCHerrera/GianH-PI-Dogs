const { Router } = require('express');
const { Temperamentos } = require('../db');

const router = Router();


router.get('/', (req, res, next) => {
    return Temperamentos.findAll()
        .then((tmp) => {
            res.send(tmp)
        })
        .catch(error => {
            next(error);
        })
})
router.post('/', async (req, res, next) => {

    try {
        const { nombre } = req.body;
        console.log(req.body); // esto da undefined por postman, por thunder clien sirve
        const newTemperament = await Temperamentos.create({ nombre })
        res.status(201).send(newTemperament);

    } catch (error) {
        next(error)
    }

})



router.delete('/', (req, res, next) => {
    res.send('Holiwi delete soy /temperament')
})
router.put('/', (req, res, next) => {
    res.send('Holiwi put soy /temperament')
})

module.exports = router;
