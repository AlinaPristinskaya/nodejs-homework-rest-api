const express = require('express')
const router = express.Router()
const{registration,login,logout,current}=require('../../controllers/users')
const guard=require('../../helpers/guard')

router.post('/registration', registration)
router.post('/login', login)
router.get('/current', guard, current)
router.post('/logout',guard, logout)

module.exports = router