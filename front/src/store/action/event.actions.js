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

    return async (dispatch) => {
        try {
            let events = await eventService.query(filterBy)
            events = events.map(event => ({ ...event, date: new Date(event.date * 1000) }))
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
            currEvent.user = user
            dispatch({
                type: 'SET_EVENT_ID',
                currEvent
            })
        } catch (err) {
            console.error('Error:', err)
        }
    }
}

