const initialState = {
    currEvent: null,
    filterBy: {
        txt: '',
        date: '',
        eventName: '',
        eventType: '',
        eventCity: '',
        eventArea: '',
        eventTicketQty: '',
        eventPricePerCard: '',
        userId: ''
    },
    events: []
}

export function eventReducer(state = initialState, action) {
    let events


    switch (action.type) {

        case 'SET_EVENTS':
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
        case 'SET_EVENT_ID':
            return { ...state, currEvent: action.currEvent }
        default:
            return state
    }
}