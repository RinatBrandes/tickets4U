const initialState = {   
    currEvent: null,
    filterBy: {
        txt: '',
        date: '',
        eventName: '',
        eventType :'',
        eventCity : '',
        eventArea : '',
        eventTicketQty : 0,
        evenPricePerCard : 0
    },
    events: []
}

export function eventReducer(state = initialState, action) {
    let events
    let currEvent

    switch (action.type) {

        case 'SET_EVENTS':
            console.log('events', events)
            return { ...state, events: action.events }
        case 'ADD_EVENT':
            events = [action.event, ...state.events]
            return { ...state, events }
        case 'REMOVE_EVENT':
            events = state.events.filter(event => event._id !== action.eventId)
            return { ...state, events }
        case 'UPDATE_EVENT':
            events = state.events.map(currEvent =>
                (currEvent._id === action.event._id) ? action.event : currEvent)
            return { ...state, events }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        case 'GET_BY_ID':
            console.log('currEvent', currEvent)
            return { ...state, currEvent: action.currEvent }
        case 'GET_SELECTED':
            return { ...state, selectedOption: action.selectedOption }
        default:
            return state
    }
}