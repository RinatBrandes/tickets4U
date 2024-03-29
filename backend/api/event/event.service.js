
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    // addLog,
    // getTypes
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)

    try {

        const collection = await dbService.getCollection('event')
        filterBy.sortBy = 'date'
        let sortType = 1
        if (filterBy.userId.length) sortType = -1
        var events = await collection.find(criteria).sort(filterBy.sortBy, sortType).toArray()
        handelEventStatus(events)
        return events
    } catch (err) {
        logger.error('cannot find events', err)
        userService.addLog('Event', 'Error', `Cannot get events`, err)
        throw err
    }
}



async function handelEventStatus(events ) {

   
    try {
        const now = Date.now() / 1000
        // console.log('now',now )
      
        events = events.map(event => {
            // console.log('event.date', event.date)
             return (event.date < now)? event.eventStatus = 'close': 'new'
            })
        // events = events.foreach(event => {
        //     const collection =  dbService.getCollection('event')
        //      collection.updateOne({ '_id': ObjectId(event._id) }, { $set: event.eventStatus })
                
        // })
      
       
        return events
    } catch (err) {
        logger.error('cannot find events', err)
        userService.addLog('Event', 'Error', `Cannot change event status`, err)
        throw err
    }
}


async function getById(eventId) {

    try {
        const collection = await dbService.getCollection('event')
        const event = await collection.findOne({ _id: ObjectId(eventId) })
        // event.date = utilService.toDate(event.date)
        delete event.password
        return event
    } catch (err) {
        logger.error(`While finding event ${eventId}`, err)
        userService.addLog('Event', 'Error', `Cannot get event`, err)
        throw err
    }
}
// async function getByEventname(eventName) {

//     try {

//         const collection = await dbService.getCollection('event')
//         const event = await collection.findOne({ eventName })

//         return event
//     } catch (err) {
//         logger.error(`while finding event ${eventName}`, err)
//         throw err
//     }
// }

async function remove(eventId) {
    try {
        const collection = await dbService.getCollection('event')
        await collection.deleteOne({ '_id': ObjectId(eventId) })
        userService.addLog('Event', 'Info', 'Remove event')
    } catch (err) {

        logger.error(`cannot remove event ${eventId}`, err)
        userService.addLog('Event', 'Error', `Cannot remove event -  ${eventId}`, err)
        throw err
    }
}

async function update(event) {
    try {

        const currEvent = event
        const id = event._id
        delete event._id
        event.eventId = id
        const user = { _id: event.userId }
        const collection = await dbService.getCollection('event')
        await collection.updateOne({ '_id': ObjectId(id) }, { $set: event })
        userService.addLog('Event', 'Info', 'Update event', user, currEvent)
        return event
    } catch (err) {

        logger.error(`cannot update event ${event._id}`, err)
        userService.addLog('Event', 'Error', `Cannot update event - ${err}`, user, event)
        throw err
    }
}

async function add(currEvent) {

    try {
        const user = { _id: currEvent.userId }
        const collection = await dbService.getCollection('event')
        await collection.insertOne(currEvent)
        userService.addLog('Event', 'Info', 'Add event', user, currEvent)
        return currEvent
    } catch (err) {
        userService.addLog('Event', 'Error', `Cannot insert event -${signupEvent} -  ${err}`, user, signupEvent)
        logger.error('cannot insert event', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    // console.log('filterBy', filterBy)
    const criteria = {}
    //   console.log('filterBy', filterBy)
    if (filterBy.fromDate && filterBy.allDate === 'false') {
        //if we ask the event of user to show in his page we want to bring all        
        criteria.date = { $gte: +filterBy.fromDate, $lte: +filterBy.fromDate }
        if (filterBy.toDate)
            criteria.date = { $gte: +filterBy.fromDate, $lte: +filterBy.toDate }
    }
    else {
        if (filterBy.allDate === 'false') {

            const today = Date.now()
            // console.log('today', today)
            //from some resean the today date is longer
            criteria.date = { $gte: (Math.trunc(today / 1000)) }
            // console.log('today parse', Math.trunc(today/1000))
            // const hour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // criteria.time = {$gte: hour}
        }
    }

    if (filterBy.eventStatus) {
        criteria.eventStatus = { $regex: filterBy.eventStatus, $options: 'i' }
    }

    if (filterBy.eventName) {
        criteria.eventName = { $regex: filterBy.eventName, $options: 'i' }
    }

    if (filterBy.eventType) {
        if (filterBy.eventType !== '' && filterBy.eventType !== 'Select')
            criteria.eventType = { $regex: filterBy.eventType, $options: 'i' }
    }

    if (filterBy.eventCity) {
        criteria.eventCity = { $regex: filterBy.eventCity, $options: 'i' }
    }

    if (filterBy.eventArea) {
        criteria.eventArea = { $regex: filterBy.eventArea, $options: 'i' }
    }


    if (filterBy.eventPricePerCard) {
        criteria.eventPricePerCard = { $gte: +filterBy.eventPricePerCard }
        // criteria.eventPricePerCard = { $regex: filterBy.eventPricePerCard, $options: 'i' }
    }

    if (filterBy.eventTicketQty) {
        criteria.ticketCount = { $gte: +filterBy.eventTicketQty }
    }

    if (filterBy.userId) {
        criteria.userId = { $regex: filterBy.userId }
    }
    // console.log('criteria', criteria)

    return criteria
}




