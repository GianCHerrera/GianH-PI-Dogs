const { Router } = require('express');

const router = Router();


router.get('/',(re,res,next)=>{
    res.send('Holiwi soy get /dogs')
})
router.post('/',(re,res,next)=>{
    res.send('Holiwi soy post /dogs')
})
router.delete('/',(re,res,next)=>{
    res.send('Holiwi delete soy /dogs')
})
router.put('/',(re,res,next)=>{
    res.send('Holiwi put soy /dogs')
})

module.exports = router;
