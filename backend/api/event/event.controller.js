const eventService = require('./event.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getEvent(req, res) {
    console.log('req.params.id',req.params.id )
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
            txt: req.query?.txt || ''
            // minBalance: +req.query?.minBalance || 0
        }
        console.log('filterBy', filterBy)
        const events = await eventService.query(filterBy)
        console.log('events in controller',events )
        res.send(events)
    } catch (err) {
        logger.error('Failed to get events', err)
        res.status(500).send({ err: 'Failed to get events' })
    }
}


async function getEventTypes(req, res) {

    try {
        // const filterBy = {
        //     txt: req.query?.txt || ''
        //     // minBalance: +req.query?.minBalance || 0
        // }
        // console.log('filterBy', filterBy)
        const events = await eventService.query()
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
    getEventTypes,
    addEvent
}