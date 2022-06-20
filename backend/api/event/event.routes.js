const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getEvent, getEvents, deleteEvent, updateEvent, getEventTypes, addEvent} = require('./event.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)


router.get('/', getEvents)
// router.get('/types', getEventTypes)
router.get('/:id', getEvent)
router.put('/:id',   updateEvent)
router.post('/',   addEvent)
// router.put('/:id',  requireAuth, updateUser)
router.delete('/:id',  deleteEvent)

module.exports = router