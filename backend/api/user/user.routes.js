const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser, requestResetPassword} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

console.log('user routes' )
router.get('/', getUsers)
router.post('/sendResetEmail:email', requestResetPassword)
router.get('/:id', getUser)
router.put('/:id',   updateUser)

// router.put('/:id',  requireAuth, updateUser)
router.delete('/:id',  deleteUser)

module.exports = router