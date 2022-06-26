import { eventService } from "../../services/event.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { userService } from "../../services/user.service.js";


export function getActionRemoveEvent(eventId) {
    return {
        type: 'REMOVE_EVENT',
        eventId
    }
}

export function getActionAddEvent(event) {
    return {
        type: 'ADD_EVENT',
        event
    }
}

export function getActionUpdateEvent(event) {
    return {
        type: 'UPDATE_EVENT',
        event
    }
}


export function loadEvents(filterBy) {
console.log('filterBy',filterBy )
    return async (dispatch) => {
        try {
            const events = await eventService.query(filterBy)
            const action = { type: 'SET_EVENTS', events }
            dispatch(action)
        } catch (err) {
            showErrorMsg('Cannot load events')
            console.log('Cannot load events', err)
        }
    }
}

export function addEvent(currEvent, isNewEvent) {
    return async (dispatch) => {
        try {
            await eventService.save(currEvent)
            if (isNewEvent) showSuccessMsg('Event added')
        } catch (err) {
            showErrorMsg('Cannot add event')
            console.log('Cannot add event', err)
        }
    }
}

export function getById(eventId) {
    return async dispatch => {
        try {
            const currEvent = await eventService.getById(eventId)
            const user = await userService.getById(currEvent.userId)
            console.log('user',user )
            currEvent.user = user
            console.log('currEvent',currEvent )
            dispatch({
                type: 'SET_EVENT_ID',
                currEvent
            })
        } catch (err) {
            console.error('Error:', err)
        }
    }
}



// // Demo for Optimistic Mutation (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveTiketOptimistic(tiketId) {

//     return (dispatch, getState) => {

//         dispatch({
//             type: 'REMOVE_TIKET',
//             tiketId
//         })
//         showSuccessMsg('Tiket removed')

//         tiketService.remove(tiketId)
//             .then(() => {
//                 console.log('Server Reported - Deleted Succesfully');
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot remove tiket')
//                 console.log('Cannot load tiket', err)
//                 dispatch({
//                     type: 'UNDO_REMOVE_TIKET',
//                 })
//             })
//     }
// }