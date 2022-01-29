const { Router } = require('express');

const router = Router();


router.get('/',(re,res,next)=>{
    res.send('Holiwi soy get /temperament')
})
router.post('/',(re,res,next)=>{
    res.send('Holiwi soy post /temperament')
})
router.delete('/',(re,res,next)=>{
    res.send('Holiwi delete soy /temperament')
})
router.put('/',(re,res,next)=>{
    res.send('Holiwi put soy /temperament')
})

module.exports = router;
