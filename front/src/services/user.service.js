// import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { store } from '../store/root.reducer'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg,showErrorMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    getLoggedinUser,
    logout,
    signup
}

async function login(userCred) {
    try{
        let user = await httpService.post('auth/login', userCred)

        if (user) {
            _handleLogin(user)
            return user
        }
    } catch (err) {
        console.dir(err)
        showErrorMsg(err)
        throw err
    }
}


async function getById(userId) {

    const user = await httpService.get(`user/${userId}`)
    return user
}


async function signup(signupUser) {

    try {

        let users = await httpService.get('user')
        const isUserExist = users.find(user => user.userName === signupUser.userName && user.password === signupUser.password)
        if (isUserExist) {
            const err = new Error('User already exist')
            throw err
        }

        const user = await httpService.post('auth/signup', signupUser)
        _handleLogin(user)
        return user
    } catch (err) {
        console.dir(err)
        showErrorMsg(err)
        throw err
    }
}

async function logout() {

    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post('auth/logout')
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}




function _handleLogin(user) {

    const miniUser = { _id: user._id, userName: user.userName }    
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(miniUser))
}