const { Router } = require('express');
const { Razas,Temperamentos  } = require('../db')
const router = Router();


router.get('/',async (req,res,next)=>{
    const dogs = await Razas.findAll({
        include: Temperamentos
    });
    res.send(dogs);
})
router.post('/',(req,res,next)=>{
    const { nombre, altura, peso, añosDeVida } = req.body;
    return Razas.create({
        nombre,
        altura,
        peso,
        añosDeVida
    })
    .then((newRaza)=>{
        res.status(201).send(newRaza);
    })
    .catch(error => next(error))
})

router.post('/:dogsId/temperament/:temperamentId',async (req,res,next)=>{
    try{
        const { dogsId, temperamentId } = req.params;
        const raza = await Razas.findByPk(dogsId);
        console.log(raza)
        await raza.addTemperamento(temperamentId); // mixin de sequelize, donde comienza por add y temrina con el nombre de la tabla
        res.status(201).send('se')
    } catch(error){
        next(error);
    }
})
router.delete('/',(req,res,next)=>{
    res.send('Holiwi delete soy /dogs')
})
router.put('/',(req,res,next)=>{
    res.send('Holiwi put soy /dogs')
})

module.exports = router;
