const router = require("express").Router();

const  { 
    itemStatus,
    itemQuery,
    itemAdd,
    itemUpdate,
    itemDelete,
    itemCompleted,

} = require('../controllers/projectDetails');

router.get('/itemStatus', itemStatus)

router.get('/itemQuery/:id', itemQuery)

router.post('/itemAdd', itemAdd)

router.put('/itemUpdate/:id', itemUpdate)

router.delete('/itemDelete/:id', itemDelete)

router.put('/itemcompleted', itemCompleted)


// router.get('/secret', [isTokenValid], verifyToken)

module.exports = router;