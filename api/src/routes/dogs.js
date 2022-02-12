const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Razas, Temperamentos } = require('../db');
const { API_KEY } = process.env
const router = Router();




router.get('/', (req, res, next) => {
    const { name } = req.query;
    let dogsPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds')
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
                getAñosDeVida = (dog.life_span).split( ' years')
                return {
                    id: dog.id,
                    nombre: dog.name,
                    altura: dog.height,
                    pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length-1]),
                    pesoMinimo: parseFloat(getPesoMaximo[0]),
                    alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length-1]),
                    alturaMinima: parseFloat(getAlturaMaxima[0]),
                    añosDeVida: getAñosDeVida[0],
                    imagen: dog.image.url,
                    temperamentos:dog.temperament
                }
            })

            // dogsDb.map(dog =>{
            //     if(dog.dataValues.temperaments.length!==0){
            //         let str = '';
            //         dog.dataValues.temperaments.map(temp=>{
            //             str = str + temp.dataValues.nombre + ', '
            //         })
            //         dog.dataValues.temperaments = str;
            //     }
            // })
            
            // console.log(dogsDb[0].dataValues.temperamentos.dataValues.nombre)
             let allDogs = [...dogsApiCorrectInfo, ...dogsDb]
            if (name) {
                // Si hay un name en query, lo busca tanto en la api con en la db
                let searchResult = [];

                for(let i=0; i<allDogs.length; i++){
                    let str = String(allDogs[i].nombre).toLowerCase()
                    if(str.includes(name)){
                        searchResult.push(allDogs[i])
                    }
                }
                if(searchResult.length === 0 ){
                    res.status(404).send('No hay razas con ese nombre')
                }else{
                    res.send(searchResult)
                }
            }else{
                    res.send(allDogs)
            }
        })
        .catch(error => next(error))
})

router.get('/apidogs', async  (req,res,next)=>{
    const allDogs = await getApiDogs();
    res.send(allDogs)
})

router.get('/db', (req,res,next)=>{
    return Razas.findAll({
        include: Temperamentos
    })
    .then(respuesta=>{
        res.send(respuesta)
    }).catch(error=> next(error))
})

router.get('/:id',  async (req, res, next) => { 
    let { id } = req.params;

    
    if (typeof id === 'string' && id.length < 10) {
        id=parseInt(id)
        let dogsApi =  await axios.get('https://api.thedogapi.com/v1/breeds/');
        let resApi = {};
        dogsApi.data.map(dog =>{

            getPesoMaximo = (dog.weight.imperial).split(' - ')
                getAlturaMaxima = (dog.height.imperial).split(' - ')
                getAñosDeVida = (dog.life_span).split( ' years')
            if(dog.id === id){
                resApi = {
                    id: dog.id,
                    nombre: dog.name,
                    altura: dog.height,
                    pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length-1]),
                    pesoMinimo: parseFloat(getPesoMaximo[0]),
                    alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length-1]),
                    alturaMinima: parseFloat(getAlturaMaxima[0]),
                    añosDeVida: getAñosDeVida[0],
                    imagen: dog.image.url,
                    temperamentos:dog.temperament
                }  
            }
        })
        res.send(resApi)
    } else {
        return resultadoBusqueda = Razas.findByPk(id)
        .then((resultadoBusqueda) => {
            res.send(resultadoBusqueda)
        })
        .catch((error) => next(error))
    }
    
})




router.post('/', (req, res, next) => {
    const { nombre, imagen, alturaMaxima, pesoMaximo,alturaMinima, pesoMinimo,añosDeVida,temperamentos } = req.body;

    if(nombre, alturaMaxima,pesoMaximo){
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
    }else{
        res.send('No hay suficiente información para agregar Raza')
    }

    
})

router.post('/:dogsId/temperament/:temperamentId', (req, res, next) => {
    try {
        const { dogsId, temperamentId } = req.params;
        mixinDogTemperament(dogsId,temperamentId)
        res.status(201)
    } catch (error) {
        next(error);
    }
})

async function mixinDogTemperament(dogsId, temperamentId){
        const raza = await Razas.findByPk(dogsId);
        await raza.addTemperaments(temperamentId); // mixin de sequelize, donde comienza por add y termina con el nombre de la tabla
}
async function getApiDogs (){
    const apiRequest = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiDogs = await apiRequest.data.map( dog=>{

        getPesoMaximo = (dog.weight.imperial).split(' - ')
        getAlturaMaxima = (dog.height.imperial).split(' - ')
        getAñosDeVida = (dog.life_span).split( ' years')
        return{
            id: dog.id,
                    nombre: dog.name,
                    altura: dog.height,
                    pesoMaximo: parseFloat(getPesoMaximo[getPesoMaximo.length-1]),
                    pesoMinimo: parseFloat(getPesoMaximo[0]),
                    alturaMaxima: parseFloat(getAlturaMaxima[getAlturaMaxima.length-1]),
                    alturaMinima: parseFloat(getAlturaMaxima[0]),
                    añosDeVida: getAñosDeVida[0],
                    imagen: dog.image.url,
                    temperamentos:dog.temperament
        }
    })
    return apiDogs;
}



// router.get('/',async (req,res,next)=>{
    //     const dogs = await Razas.findAll({
        //         include: Temperamento
        //     });
        //     res.send(dogs);
        // })
        
        module.exports = router;
        
        // router.get('/', (req, res, next) => {
        
        //     const { name } = req.query;
        //     let dogsPromiseApi;
        //     let dogsPromiseDb;
        
        //     if (name) {
        //         dogsPromiseApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        //         dogsPromiseDb = Razas.findAll({
        //             include: Temperamento,
        //             where: {
        //                 nombre: {
        //                     [Op.iLike]: '%' + name + '%'
        //                 }
        //             }
        //         })
        //     } else {
        //         dogsPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds')
        //         dogsPromiseDb = Razas.findAll({
        //             include: Temperamento
        //         })
        //     }
        //     Promise.all([
        //         dogsPromiseApi,
        //         dogsPromiseDb
        //     ])
        //         .then((respuesta) => {
        //             const [dogsApi, dogsDb] = respuesta;
        //             let dogsApiCorrectInfo = dogsApi.data.map((dog) => {
        //                 console.log(dog.image.url);
        //                 return {
        //                     id: dog.id,
        //                     nombre: dog.name,
        //                     altura: dog.height,
        //                     peso: dog.weight,
        //                     añosDeVida: dog.life_span,
        //                     imagen: dog.image.url
        //                 }
        //             })
        //             let allDogs = [...dogsApiCorrectInfo, ...dogsDb]
        //             if(allDogs.length===0){
        //                 res.status(404).send('No hay razas con ese nombre')
        //             }else{
        //                 res.send(allDogs)
        //             }
        //         })
        //         .catch(error => next(error))
        
        // })