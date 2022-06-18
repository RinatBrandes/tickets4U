const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {}

        const collection = await dbService.getCollection('ticket')

        // let sortBy = filterBy.sortBy 
        // let sortType = 1
        // if(sortBy === 'recent') {
        //     sortBy = 'createdAt'
        //     sortType = -1
        // }
        let tickets = await collection.find(criteria).toArray()
        // let tickets = await collection.find(criteria).sort({[sortBy]:sortType}).toArray()

        return tickets
    } catch (err) {
        logger.error('cannot find tickets', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria
            }
        ]
    }
   

    // const PAGE_SIZE = 3
    // if (filterBy.pageIdx !== undefined) {
    //     const startIdx = +filterBy.pageIdx * PAGE_SIZE
    //     // if (startIdx > tickets.length - 1) return Promise.reject()
    //     tickets = tickets.slice(startIdx, startIdx + PAGE_SIZE)
    // }

    

    return criteria
}

async function getById(ticketId) {
    
    try {
        const collection = await dbService.getCollection('ticket')
        const ticket = collection.findOne({ _id: ObjectId(ticketId) })
        return ticket
    } catch (err) {
        logger.error(`while finding ticket ${ticketId}`, err)
        throw err
    }
}

async function remove(ticketId) {
    try {
        const collection = await dbService.getCollection('ticket')
        await collection.deleteOne({ _id: ObjectId(ticketId) })
        return ticketId
    } catch (err) {
        logger.error(`cannot remove ticket ${ticketId}`, err)
        throw err
    }
}

async function add(ticket) {
    // TODO - add ticket. description with make lorem
    try {
        const collection = await dbService.getCollection('ticket')
        // const addedticket = await collection.insertOne(ticket)
        await collection.insertOne(ticket)
        // addedticket = addedticket.ops.pop()
        return ticket
    } catch (err) {
        logger.error('cannot insert ticket', err)
        throw err
    }
}

async function update(ticket) {
    
    try {
        let id = ObjectId(ticket._id)
        delete ticket._id
        const collection = await dbService.getCollection('ticket')
        await collection.updateOne({ _id: id }, { $set: { ...ticket } })
        return ticket
    } catch (err) {
        logger.error(`cannot update ticket ${ticketId}`, err)
        throw err
    }
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
   
}