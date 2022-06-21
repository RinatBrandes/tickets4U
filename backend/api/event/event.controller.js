const eventService = require('./event.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')

async function getEvent(req, res) {
    
    try {
        const event = await eventService.getById(req.params.id)        
        res.send(event)
    } catch (err) {
        logger.error('Failed to get event', err)
        res.status(500).send({ err: 'Failed to get event' })
    }
}

async function getEvents(req, res) {

    try {

        const filterBy = {
            txt: req.query?.txt || '',
            fromDate: req.query?.fromDate || '',
            toDate: req.query?.toDate || '',
            eventName: req.query?.eventName || '',
            eventType: req.query?.eventType || '',
            eventCity: req.query?.eventCity || '',
            eventArea: req.query?.eventArea || '',
            eventPricePerCard: req.query?.eventPricePerCard || '',
            eventTicketQty: req.query?.eventTicketQty || '',
            userId: req.query?.userId || '',
            sortBy: req.query?.sortBy || ''
        }        
        //set the date to timestamp
        if(filterBy.fromDate !== '') filterBy.fromDate= utilService.toTimestamp(filterBy.fromDate)
        if(filterBy.toDate !== '') filterBy.toDate=utilService.toTimestamp(filterBy.toDate)

        const events = await eventService.query(filterBy)
        res.send(events)
    } catch (err) {
        logger.error('Failed to get events', err)
        res.status(500).send({ err: 'Failed to get events' })
    }
}



async function deleteEvent(req, res) {
    try {
        await eventService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete event', err)
        res.status(500).send({ err: 'Failed to delete event' })
    }
}

async function updateEvent(req, res) {
    try {
        const event = req.body        
        const savedEvent = await eventService.update(event)        
        res.send(savedEvent)
    } catch (err) {
        logger.error('Failed to update event', err)
        res.status(500).send({ err: 'Failed to update event' })
    }
}

async function addEvent(req, res) {
    try {
        const event = req.body
        const savedEvent = await eventService.add(event)
        res.send(savedEvent)
    } catch (err) {
        logger.error('Failed to add event', err)
        res.status(500).send({ err: 'Failed to add event' })
    }
}

module.exports = {
    getEvent,
    getEvents,
    deleteEvent,
    updateEvent,
    addEvent
}