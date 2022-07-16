import { userService } from '../../services/user.service.js'


const initialState = {
    loggedInUser: userService.getLoggedinUser() || null,
    users: [],
    watchedUser: null,
    user: null
}

export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_LOGGED_USER':
            newState = { ...state, loggedInUser: action.user }
            break;
        case 'SET_USER':
            newState = { ...state, loggedInUser: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'SET_USER_ID':
            newState = { ...state, user: action.user }
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
