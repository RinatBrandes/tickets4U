const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getTickets, getTicketById, addTicket, updateTicket, removeTicket } = require('./ticket.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',  getTickets)
router.get('/:id', getTicketById)
router.post('/',  addTicket)
// router.post('/', requireAuth, requireAdmin, addToy)
router.put('/edit/:id',  updateTicket)
router.delete('/:id', removeTicket)

module.exports = router