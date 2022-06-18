const ticketService = require('./ticket.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getTickets(req, res) {
  try {
    // logger.debug('Trying to get tickets')
    var queryParams = req.query;    
    const tickets = await ticketService.query(queryParams)
    // logger.debug('ticket.controller row 11 tickets', tickets)
    res.json(tickets);
  } catch (err) {
    logger.error('Failed to get tickets', err)
    res.status(500).send({ err: 'Failed to get tickets' })
  }
}

// GET BY ID 
async function getTicketById(req, res) {
  
  try {
    const ticketId = req.params.id;
    const ticket = await ticketService.getById(ticketId)
    res.json(ticket)
  } catch (err) {
    logger.error('Failed to get ticket', err)
    res.status(500).send({ err: 'Failed to get ticket' })
  }
}

// POST (add ticket)
async function addTicket(req, res) {
  try {
    const ticket = req.body;
    logger.info('from ticket.controller - addTicket(req, res)', ticket)
    const addedTicket = await ticketService.add(ticket)
    logger.info('from ticket.controller - addTicket(req, res)', addedTicket)
    res.json(addedTicket)
  } catch (err) {
    logger.error('Failed to add ticket', err)
    res.status(500).send({ err: 'Failed to add ticket' })
  }
}


// PUT (Update ticket)
async function updateTicket(req, res) {
  try {
    const ticket = req.body;
    const updatedTicket = await ticketService.update(ticket)
    res.json(updatedTicket)
  } catch (err) {
    logger.error('Failed to update ticket', err)
    res.status(500).send({ err: 'Failed to update ticket' })
  }
}

async function updateTicketRate(req, res) {
  try {
    const ticket = req.body;
    const rating = req.body;
    const updatedRate = await ticketService.updateUserRating(ticket, rating)
    res.json(updatedRate)
  } catch (err) {
    logger.error('Failed to update ticket', err)
    res.status(500).send({ err: 'Failed to update ticket' })
  }
}

// DELETE (Remove ticket)
async function removeTicket(req, res) {

  try {
    const ticketId = req.params.id;
    const removedId = await ticketService.remove(ticketId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove ticket', err)
    res.status(500).send({ err: 'Failed to remove ticket' })
  }
}

module.exports = {
  getTickets,
  getTicketById,
  addTicket,
  updateTicket,
  updateTicketRate,
  removeTicket
}
