const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { userName, password } = req.body
// console.log('req.body', req.body)
    try {
        const user = await authService.login(userName, password)
console.log('user',user )
        const loginToken = authService.getLoginToken(user)
        logger.info('User login: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const signupUser = req.body

        // Never log passwords
        // logger.debug(credentials)
        const account = await authService.signup(signupUser)

        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(signupUser.userName, signupUser.password)
    
        logger.info('User signup:', signupUser)
        const loginToken = authService.getLoginToken(user)
    
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        console.log('err', err)
        
        res.status(500).send({ err: err })
        // res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {

    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}