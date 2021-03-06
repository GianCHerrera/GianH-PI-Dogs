const axios = require('axios');
const { Router } = require('express');
const { Temperaments } = require('../db');

const router = Router();


router.get('/', (req, res, next) => {
        let listTemperaments = [], uniqueTemperaments = [];
        axios.get('https://api.thedogapi.com/v1/breeds')
            .then(async repuesta => {
                repuesta.data.map((breed) => {
                    let list = String(breed.temperament)
                    let temps = list.split(', ')
                    listTemperaments = [...listTemperaments, ...temps]
                })
                const setTemperaments = new Set(listTemperaments);
                uniqueTemperaments = [...setTemperaments];
                uniqueTemperaments.map(element => {
                    if( element !== 'undefined'){
                        Temperaments.findOrCreate({
                            where: {
                                nombre: element
                            }
                        })
                    }
                })
                const temperaments = await Temperaments.findAll()
                res.send(temperaments)
            })
            .catch(error=> next(error))
})
router.post('/', async (req, res, next) => {

    try {
        const { nombre } = req.body;
        console.log(req.body); // esto da undefined por postman, por thunder clien sirve
        const newTemperament = await Temperaments.create({ nombre })
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
