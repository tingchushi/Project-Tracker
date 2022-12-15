const router = require("express").Router();

const  { 
    itemStatus,
    itemQuery,
    itemAdd,
    itemUpdate,
    itemDelete,
    projectStatus,
    itemCompleted,
    projectQuery,
    projectAll,
    projectAdd,
    projectDelete,
    itemQueryByProject,
    projectById, 
    projectUpdate,
    userByProject,
    projectProgress,
    projectOverall
} = require('../controllers/projectDetails');

const  { isTokenValid } = require('../controllers/userLogin.js')

router.get('/itemStatus', itemStatus)

router.get('/itemQuery/:id', itemQuery)

router.post('/itemAdd', itemAdd)

router.put('/itemUpdate/:id', itemUpdate)

router.delete('/itemDelete/:id', itemDelete)

router.put('/itemcompleted', itemCompleted)

router.get('/status', projectStatus)

router.get('/query/:id', projectQuery)

router.get('/all', projectAll)

router.post('/add/:id', projectAdd)

router.delete('/delete/:id', projectDelete)

router.get('/item/:id', itemQueryByProject)

router.get('/user/:id', projectById)

router.put('/update/:id', projectUpdate)

router.get('/participant/:id', userByProject)

router.get('/progress/:id', projectProgress)

router.get('/overall/:id', projectOverall)

// router.get('/secret', [isTokenValid], verifyToken)

module.exports = router;