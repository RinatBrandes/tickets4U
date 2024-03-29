const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Wiserr-1234')

async function login(userName, password) {
    try {
        logger.debug(`auth.service - login with username: ${userName}`)
        // const user = await userService.getByUsername(userName)        
        const user = await userService.getUser(userName,password)

        if (!user) return Promise.reject('Invalid username or password')
        // TODO: un-comment for real login
        // const match = await bcrypt.compare(password, user.password)
        // if (!match) return Promise.reject('Invalid username or password')

        delete user.password
        user._id = user._id.toString()
        userService.addLog('user', 'info', `login  - ${user.userName}`, user)
        return user
    } catch (err) {
        userService.addLog('user', 'error', `auth service - cannot login  - username or password inccorect${user.userName} - ${err}`, user)
        console.log('cannot login')
        res.status(401).send({ err: 'Username or password inccorect' })
    }
}

async function signup(signupUser) {

    try {
        const saltRounds = 10
        logger.debug(`auth.service - signup with username: ${signupUser.userName}, password: ${signupUser.password}`)
        if (!signupUser.userName || !signupUser.password) return Promise.reject('Missing required signup information')
        const userExist = await userService.getByUsername(signupUser.userName)
        if (userExist) return Promise.reject('Username already taken')

        const hash = await bcrypt.hash(signupUser.password, saltRounds)
        signupUser.password = hash
        return userService.add(signupUser)
    } catch (err) {
        console.log('cannot signup')
    }
}


function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}