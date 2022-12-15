const router = require("express").Router();

const  { 
  userLogin, 
  userSignUp, 
  verifyToken,
  isTokenValid,
  userQuery
} = require('../controllers/userLogin.js')

const { verify } = require("jsonwebtoken");

router.post('/login', userLogin)

router.post('/signup', userSignUp)

router.get('/search/:id', userQuery)

router.get('/secret', [isTokenValid], verifyToken)

module.exports = router;