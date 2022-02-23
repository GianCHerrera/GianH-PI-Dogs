const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Razas, Temperamentos } = require('../db');
const { API_KEY } = process.env
const router = Router();




router.get('/', (req, res, next) => {
    const { name } = req.query;
    let dogsPromiseApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let dogsPromiseDb = Razas.findAll({
        include: Temperamentos
    })
    Promise.all([
        dogsPromiseApi,
        dogsPromiseDb
    ])
        .then((respuesta) => {
            const [dogsApi, dogsDb] = respuesta;
            let getPesoMaximo, getAlturaMaxima, getAñosDeVida;
            let dogsApiCorrectInfo = dogsApi.data.map((dog) => {
                getPesoMaximo = (dog.weight.imperial).split(' - ')
                getAlturaMaxima = (dog.height.imperial).split(' - ')
                getAñosDeVida = (dog.life_span).split(' years')
                return {
                    id: dog.id,
                    nombre: dog.name,
                    altura: dog.height,
                    pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length - 1]),
                    pesoMinimo: parseFloat(getPesoMaximo[0]),
                    alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length - 1]),
                    alturaMinima: parseFloat(getAlturaMaxima[0]),
                    añosDeVida: getAñosDeVida[0],
                    imagen: dog.image.url,
                    temperamentos: dog.temperament
                }
            })
            let allDogs = [...dogsApiCorrectInfo, ...dogsDb]
            if (name) {
                // Si hay un name en query, lo busca tanto en la api con en la db
                let searchResult = [];

                for (let i = 0; i < allDogs.length; i++) {
                    let str = String(allDogs[i].nombre).toLowerCase()
                    if (str.includes(name)) {
                        searchResult.push(allDogs[i])
                    }
                }
                if (searchResult.length === 0) {
                    res.status(404).send('No hay razas con ese nombre')
                } else {
                    res.send(searchResult)
                }
            } else {
                res.send(allDogs)
            }
        })
        .catch(error => next(error))
})

router.get('/apidogs', async (req, res, next) => {
    try {
        const allDogs = await getApiDogs();
        res.send(allDogs)
    } catch (error) {
        next(error)
    }
})

// router.get('/apidogs', (req,res,next)=>{
//     return axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
//     .then(respuesta=>{
//         res.send(respuesta.data)
//     })
//     .catch(error=>next(error))
// })



router.get('/db', (req, res, next) => {
    return Razas.findAll({
        include: Temperamentos
    })
        .then(respuesta => {
            res.send(respuesta)
        }).catch(error => next(error))
})


// router.get('/db', async (req, res, next) => {
//     try{
//         let dogsDB = await Razas.findAll({
//                 include: Temperamentos
//             }
//         )
//         res.send(dogsDB)
//     }catch(error){
//         next(error)
//     }
// })

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;


    if (typeof id === 'string' && id.length < 10) {
        try {
            id = parseInt(id)
            let dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds/');
            let resApi = {};
            dogsApi.data.map(dog => {

                getPesoMaximo = (dog.weight.imperial).split(' - ')
                getAlturaMaxima = (dog.height.imperial).split(' - ')
                getAñosDeVida = (dog.life_span).split(' years')
                if (dog.id === id) {
                    resApi = {
                        id: dog.id,
                        nombre: dog.name,
                        altura: dog.height,
                        pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length - 1]),
                        pesoMinimo: parseFloat(getPesoMaximo[0]),
                        alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length - 1]),
                        alturaMinima: parseFloat(getAlturaMaxima[0]),
                        añosDeVida: getAñosDeVida[0],
                        imagen: dog.image.url,
                        temperamentos: dog.temperament
                    }
                }
            })
            res.send(resApi)
        } catch (error) {
            next(error)
        }
    } else {
        try{
            let resultadoBusqueda = await Razas.findByPk(id)
            res.send(resultadoBusqueda)
        }catch(error){
            next(error)
        }
    }
})


// router.get('/:id', (req, res, next) => {
//     let id = req.params.id;

//     if (typeof id === 'string' && id.length < 10) {
//         id = parseInt(id)
//         let resApi = {}
//         return axios.get('https://api.thedogapi.com/v1/breeds/')
//             .then(respuesta => {
//                 respuesta.data.map(dog => {
//                     getPesoMaximo = (dog.weight.imperial).split(' - ')
//                     getAlturaMaxima = (dog.height.imperial).split(' - ')
//                     getAñosDeVida = (dog.life_span).split(' years')
//                     if (dog.id === id) {
//                         resApi = {
//                             id: dog.id,
//                             nombre: dog.name,
//                             altura: dog.height,
//                             pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length - 1]),
//                             pesoMinimo: parseFloat(getPesoMaximo[0]),
//                             alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length - 1]),
//                             alturaMinima: parseFloat(getAlturaMaxima[0]),
//                             añosDeVida: getAñosDeVida[0],
//                             imagen: dog.image.url,
//                             temperamentos: dog.temperament
//                         }
//                     }
//                 })
//                 res.send(resApi)
//             }).catch(error => next(error))
//     } else {
//         return resultadoBusqueda = Razas.findByPk(id)
//             .then((resultadoBusqueda) => {
//                 res.send(resultadoBusqueda)
//             })
//             .catch((error) => next(error))
//     }
// })




router.post('/', (req, res, next) => {
    const { nombre, imagen, alturaMaxima, pesoMaximo, alturaMinima, pesoMinimo, añosDeVida, temperamentos } = req.body;

    if (nombre, alturaMaxima, pesoMaximo) {
        return Razas.create({
            nombre,
            alturaMaxima,
            pesoMaximo,
            alturaMinima,
            pesoMinimo,
            añosDeVida,
            imagen,
            temperamentos
        })
            .then((newRaza) => {
                res.status(201).send(newRaza);
            })
            .catch(error => next(error))
    } else {
        res.send('No hay suficiente información para agregar Raza')
    }


})

router.post('/:dogsId/temperament/:temperamentId', (req, res, next) => {
    try {
        const { dogsId, temperamentId } = req.params;
        mixinDogTemperament(dogsId, temperamentId)
        res.status(201)
    } catch (error) {
        next(error);
    }
})

async function mixinDogTemperament(dogsId, temperamentId) {
    const raza = await Razas.findByPk(dogsId);
    await raza.addTemperaments(temperamentId); // mixin de sequelize, donde comienza por add y termina con el nombre de la tabla
}
async function getApiDogs() {
    const apiRequest = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiDogs = await apiRequest.data.map(dog => {

        getPesoMaximo = (dog.weight.imperial).split(' - ')
        getAlturaMaxima = (dog.height.imperial).split(' - ')
        getAñosDeVida = (dog.life_span).split(' years')
        return {
            id: dog.id,
            nombre: dog.name,
            altura: dog.height,
            pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length - 1]),
            pesoMinimo: parseFloat(getPesoMaximo[0]),
            alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length - 1]),
            alturaMinima: parseFloat(getAlturaMaxima[0]),
            añosDeVida: getAñosDeVida[0],
            imagen: dog.image.url,
            temperamentos: dog.temperament
        }
    })
    return apiDogs;
}



module.exports = router;
