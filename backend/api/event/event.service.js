
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
    getTypes
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    
    try {
            const collection = await dbService.getCollection('event')        
            filterBy.sortBy = 'fromDate' 
            var events = await collection.find(criteria).sort(filterBy.sortBy, 1).toArray()        
            events.map(event => {    
            return event.date = utilService.toDate(event.date)
        })        
        return events
    } catch (err) {
        logger.error('cannot find events', err)
        throw err
    }
}                
//{ "date": {$gt: 1655719631052} }

async function getTypes() {

    const criteria = null
    try {
        const collection = await dbService.getCollection('eventTypes')
        var eventTypes = await collection.find(criteria).toArray()
        return events
    } catch (err) {
        logger.error('Cannot find eventTypes', err)
        throw err
    }
}


async function getById(eventId) {

    try {
        const collection = await dbService.getCollection('event')
        const event = await collection.findOne({ _id: ObjectId(eventId) })
        event.date = utilService.toDate(event.date)
        delete event.password

        return event
    } catch (err) {
        logger.error(`While finding event ${eventId}`, err)
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
       

        const id = event._id
        delete event._id
        const user = {_id: event.userId}
        const collection = await dbService.getCollection('event')
        await collection.updateOne({'_id':ObjectId(id)},{$set:event})
        userService.addLog('Event', 'Info', 'Update event',user, event)
        return event
    } catch (err) {

        logger.error(`cannot update event ${event._id}`, err)
        userService.addLog('Event', 'Error', `Cannot update event - ${err}`,user, event)
        throw err
    }
}

async function add(currEvent) {
   
    try {
        const user = {_id : currEvent.userId}
        const collection = await dbService.getCollection('event')
        await collection.insertOne(currEvent)
        userService.addLog('Event', 'Info', 'Add event',user, currEvent)        
        return currEvent
    } catch (err) {
        userService.addLog('Event', 'Error', `Cannot insert event -${signupEvent} -  ${err}`,user , signupEvent )
        logger.error('cannot insert event', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.fromDate) {
        criteria.date = { $gte: filterBy.fromDate ,  $lte:filterBy.fromDate}
        if(filterBy.toDate)
        criteria.date = { $gte: filterBy.fromDate ,  $lte:filterBy.toDate }
    } 
    else {
        const today = Date.now()
        //from some resean the today date is longer
        criteria.date = {$gte: (Math.trunc(today/1000)) }        
    }



    if (filterBy.eventName) {
        criteria.eventName = { $regex: filterBy.eventName, $options: 'i' }
    }
    
    if (filterBy.eventType) {
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
    

    return criteria
}




