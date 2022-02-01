const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Razas, Temperamento } = require('../db');
const router = Router();


router.get('/', (req, res, next) => {

    const { name } = req.query;
    let dogsPromiseApi;
    let dogsPromiseDb;

    if (name) {
        dogsPromiseApi = axios.get((`https://api.thedogapi.com/v1/breeds/search?q=${name}`))
        dogsPromiseDb = Razas.findAll({
            include: Temperamento,
            where: {
                nombre: {
                    [Op.iLike]: '%' + name + '%'
                }
            }
        })
    } else {
        dogsPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds')
        dogsPromiseDb = Razas.findAll({
            include: Temperamento
        })
    }
    Promise.all([
        dogsPromiseApi,
        dogsPromiseDb
    ])
        .then((respuesta) => {
            const [dogsApi, dogsDb] = respuesta;
            let dogsApiCorrectInfo = dogsApi.data.map((dog) => {
                return {
                    id: dog.id,
                    nombre: dog.name,
                    altura: dog.height,
                    peso: dog.weight,
                    añosDeVida: dog.life_span
                }
            })
            let allDogs = [...dogsApiCorrectInfo, ...dogsDb]
            if(allDogs.length===0){
                res.status(404).send('No hay razas con ese nombre')
            }else{
                res.send(allDogs)
            }
        })
        .catch(error => next(error))

})


router.get('/:id', (req,res,next)=>{
    
        const { id } = req.params;

        if( typeof id === 'string' && id.length < 10 ){
            return axios.get('https://api.thedogapi.com/v1/breeds/'+id)
            .then((resultadoBusqueda)=>{
                let breed = {
                    id: resultadoBusqueda.data.id,
                    nombre:  resultadoBusqueda.data.name,
                    altura:  resultadoBusqueda.data.height,
                    peso: resultadoBusqueda.data.weight,
                    añosDeVida: resultadoBusqueda.data.life_span
                }
                res.send(breed)
            })
            .catch((error)=> next(error))
        }else{
           return resultadoBusqueda =  Razas.findByPk(id)
            .then((resultadoBusqueda)=>{
                res.send(resultadoBusqueda)
            })
            .catch((error)=> next(error))
        }
   
})


router.post('/', (req, res, next) => {
    const { nombre, altura, peso, añosDeVida } = req.body;
    return Razas.create({
        nombre,
        altura,
        peso,
        añosDeVida
    })
        .then((newRaza) => {
            res.status(201).send(newRaza);
        })
        .catch(error => next(error))
})

router.post('/:dogsId/temperament/:temperamentId', async (req, res, next) => {
    try {
        const { dogsId, temperamentId } = req.params;
        const raza = await Razas.findByPk(dogsId);
        console.log(raza)
        await raza.addTemperamento(temperamentId); // mixin de sequelize, donde comienza por add y termina con el nombre de la tabla
        res.status(201).send('ok')
    } catch (error) {
        next(error);
    }
})


// router.get('/',async (req,res,next)=>{
//     const dogs = await Razas.findAll({
//         include: Temperamento
//     });
//     res.send(dogs);
// })

module.exports = router;
