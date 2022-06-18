
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
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
    console.log('criteria',criteria )
    console.log('filterBy', filterBy)
    try {
        const collection = await dbService.getCollection('event')
        var events = await collection.find(criteria).toArray()
        console.log('events in service ',events )
        return events
    } catch (err) {
        logger.error('cannot find events', err)
        throw err
    }
}


async function getTypes() {
    // const criteria = _buildCriteria(filterBy)
    // console.log('criteria',criteria )
    // console.log('filterBy', filterBy)
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
    console.log('eventId', eventId)
    try {
        const collection = await dbService.getCollection('event')
        const event = await collection.findOne({ _id: ObjectId(eventId) })
        
        delete event.password

        return event
    } catch (err) {
        logger.error(`while finding event ${eventId}`, err)
        throw err
    }
}
// async function getByEventname(eventName) {
    
//     try {
//         console.log('eventName', eventName)
//         const collection = await dbService.getCollection('event')
//         const event = await collection.findOne({ eventName })
//         console.log('event', event)
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
        // peek only updatable properties
        const eventToSave = {
            _id: ObjectId(event._id), // needed for the returnd obj
            fullName: event.fullname,
            isSeller: event.isSeller,
            avgOrdersRate: event.avgOrdersRate,
            // score: event.score,
        }
        const collection = await dbService.getCollection('event')
        await collection.updateOne({ _id: eventToSave._id }, { $set: eventToSave })
        addLog('event', 'info', 'update event', eventToSave)
        return eventToSave
    } catch (err) {
        logger.error(`cannot update event ${event._id}`, err)
        throw err
    }
}

async function add(currEvent) {
   
    try {

        const collection = await dbService.getCollection('event')
        await collection.insertOne(currEvent)
        // console.log('currEvent', currEvent)
        addLog('event', 'info', 'add event', currEvent)
        
        return currEvent
    } catch (err) {
        addLog('event', 'error', `cannot insert event -${signupEvent} -  ${err}`,  signupEvent )
        logger.error('cannot insert event', err)
        throw err
    }
}


async function addLog(collectionName, logType, details, eventData={}){
// console.log('add log' , eventData)
    const logDetails = {
        subject: collectionName,
        userId: ObjectId(eventData.userId),
        eventId: eventData._id ? eventData._id: null,
        type: logType,
        details: details,
        createdAt: Date.now()
    }
    console.log('logDetails', logDetails)
    const collection = await dbService.getCollection('log')
    await collection.insertOne(logDetails)
}




function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                eventName: txtCriteria
            }
      
        ]
    }
    // if (filterBy.minBalance) {
    //     criteria.score = { $gte: filterBy.minBalance }
    // }
    return criteria
}




