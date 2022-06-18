
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    updateUserIsSeller,
    addLog
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('criteria',criteria )
    console.log('filterBy', filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    console.log('userId', userId)
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        
        delete user.password

        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(userName) {
    
    try {
        console.log('userName', userName)
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ userName })
        console.log('user', user)
        return user
    } catch (err) {
        logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable properties
        const userToSave = {
            _id: ObjectId(user._id), // needed for the returnd obj
            fullName: user.fullname,
            isSeller: user.isSeller,
            avgOrdersRate: user.avgOrdersRate,
            // score: user.score,
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        addLog('user', 'info', 'update user', userToSave)
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(signupUser) {
   
    try {

        const collection = await dbService.getCollection('user')
        await collection.insertOne(signupUser)
        console.log('signupUser', signupUser)
        addLog('user', 'info', 'signup', signupUser)
        
        return signupUser
    } catch (err) {
        addLog('user', 'error', `cannot insert user -${signupUser} -  ${err}`,  signupUser )
        logger.error('cannot insert user', err)
        throw err
    }
}


async function addLog(collectionName, logType, details, userData,eventData={}){
// console.log('add log' , userData)
    const logDetails = {
        subject: collectionName,
        userId: ObjectId(userData._id),
        eventId: eventData._id ? eventData._id: null,
        type: logType,
        details: details,
        createAt: Date.now()
    }
    console.log('logDetails', logDetails)
    const collection = await dbService.getCollection('log')
    await collection.insertOne(logDetails)
}


async function updateUserIsSeller(userId){
    
    const userToSave = await getById(userId)    
    userToSave.isSeller = true    
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ _id: ObjectId(userId) }, { $set: userToSave })
    

    return userToSave
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                userName: txtCriteria
            },
            {
                fullName: txtCriteria
            }
        ]
    }
    // if (filterBy.minBalance) {
    //     criteria.score = { $gte: filterBy.minBalance }
    // }
    return criteria
}




