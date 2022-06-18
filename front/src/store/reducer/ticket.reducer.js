const initialState = {
    tickets: []
    
}


export function ticketReducer(state = initialState, action) {
    var newState = state

    switch (action.type) {
        case 'SET_TICKETS':
            newState = { ...state, tickets: action.tickets }
            break;
        // case 'UNDO_REMOVE_CAR':
        //     if (state.lastRemovedCar) {
        //         newState = { ...state, cars: [...state.cars, state.lastRemovedCar], lastRemovedCar: null}
        //     }
        //     break
        default:
    }            
    return newState
}

