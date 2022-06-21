
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    getById,
    remove,
    update,
    add,    
    addLog,
    getTypes
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
      console.log('criteria', criteria)
    try {
        const collection = await dbService.getCollection('event')        
        filterBy.sortBy = 'date' 
        // console.log('filterBy in event service row 24',filterBy )
        // console.log('criteria', criteria)
        var events = await collection.find(criteria).sort(filterBy.sortBy, 1).toArray()        
        events.map(event => {
            // console.log('utilService.toDate(event.date)', (event.date))
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
        logger.error('cannot find eventTypes', err)
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
        logger.error(`while finding event ${eventId}`, err)
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
    } catch (err) {
        logger.error(`cannot remove event ${eventId}`, err)
        throw err
    }
}

async function update(event) {
    try {
       

        const id = event._id
        delete event._id
        const collection = await dbService.getCollection('event')
        await collection.updateOne({'_id':ObjectId(id)},{$set:event})
        addLog('event', 'info', 'update event', event)
        return event
    } catch (err) {
        logger.error(`cannot update event ${event._id}`, err)
        throw err
    }
}

async function add(currEvent) {
   
    try {
        
        const collection = await dbService.getCollection('event')
        await collection.insertOne(currEvent)
        addLog('event', 'info', 'add event', currEvent)
        
        return currEvent
    } catch (err) {
        addLog('event', 'error', `cannot insert event -${signupEvent} -  ${err}`,  signupEvent )
        logger.error('cannot insert event', err)
        throw err
    }
}


async function addLog(collectionName, logType, details, eventData={}){
    const logDetails = {
        subject: collectionName,
        userId: ObjectId(eventData.userId),
        eventId: eventData._id ? eventData._id: null,
        type: logType,
        details: details,
        createdAt: Date.now()
    }
    
    const collection = await dbService.getCollection('log')
    await collection.insertOne(logDetails)
}




function _buildCriteria(filterBy) {
    const criteria = {}
   
    if (filterBy.date) {
        criteria.date = { $regex: filterBy.date }
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




