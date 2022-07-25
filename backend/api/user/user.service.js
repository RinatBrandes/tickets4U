
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId



module.exports = {
    query,
    getById,
    getByUsername,
    getUser,
    remove,
    update,
    add,
    updateUserIsSeller,
    addLog
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)

    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        userService.addLog('User', 'Error', `Cannot get user`, err)
        throw err
    }
}

async function getById(userId) {
    
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
        
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ userName })
        return user
    } catch (err) {
        logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function getUser(userName, password) {
    
    try {
        const criteria = {}
        criteria.$and = [
            {
                userName: userName
            },
            {
                password: password
            }
        ]
        console.log('criteria',criteria )
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne( criteria )
        console.log('user',user )
        if(user === null){
            addLog('user', 'Error', `Cannot logged in - user or password incorrect - ${userName}`)
            const err = 'Username or password inncorect'
            throw err
        }
        return user
    } catch (err) {
        console.log('err in row 89 user service', err)
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
        // const userToSave = {
        //     _id: ObjectId(user._id), // needed for the returnd obj
        //     fullName: user.fullname,
        //     isSeller: user.isSeller,
        //     avgOrdersRate: user.avgOrdersRate,
        //     // score: user.score,
        // }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: user })
        addLog('user', 'info', 'update user', user)
        return user
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(signupUser) {
   
    try {

        const collection = await dbService.getCollection('user')
        await collection.insertOne(signupUser)
        addLog('user', 'info', 'signup', signupUser)
        
        return signupUser
    } catch (err) {
        addLog('User', 'error', `Cannot insert user -${signupUser} -  ${err}`,  signupUser )
        logger.error('cannot insert user', err)
        throw err
    }
}


async function addLog(collectionName, logType, details, userData,eventData={}){
    if (userData === undefined) {       
        var userData = {
            _id: 0,            
        }
    }
   
    const logDetails = {
        subject: collectionName,
        userId: ObjectId(userData._id) ? ObjectId(userData._id) : 0,
        eventId: eventData.eventId ? eventData.eventId: null,
        type: logType,
        details: details,
        createdAt: Date.now()
    }
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




