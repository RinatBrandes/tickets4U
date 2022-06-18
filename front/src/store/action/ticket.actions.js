import { ticketService } from "../services/ticket.service.js";
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'




export function loadTickets() {
    return (dispatch) => {
        ticketService.query()
            .then(tickets => {
                console.log('Tickets from DB:', tickets)
                dispatch({
                    type: 'SET_TICKETS',
                    tickets
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load ticket')
                console.log('Cannot load tickets', err)
            })  
    }
}

// export function removeTiket(tiketId) {
//     return async (dispatch) => {
//         try {
//             await tiketService.remove(tiketId)
//             console.log('Deleted Succesfully!');
//             dispatch(getActionRemoveTiket(tiketId))
//             showSuccessMsg('Tiket removed')
//         } catch (err) {
//             showErrorMsg('Cannot remove tiket')
//             console.log('Cannot remove tiket', err)
//         }
//     }
// }

// export function addTiket(tiket) {
//     return (dispatch) => {

//         tiketService.save(tiket)
//             .then(savedTicket => {
//                 console.log('Added tiket', savedTiket);
//                 dispatch(getActionAddtiket(savedTiket))
//                 showSuccessMsg('Tiket added')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot add tiket')
//                 console.log('Cannot add tiket', err)
//             })
//     }
// }

// export function updateTiket(tiket) {
//     return (dispatch) => {
//         tiketService.save(tiket)
//             .then(savedTiket => {
//                 console.log('Updated Tiket:', savedTiket);
//                 dispatch(getActionUpdateTiket(savedTiket))
//                 showSuccessMsg('Tiket updated')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot update tiket')
//                 console.log('Cannot save tiket', err)
//             })
//     }
// }

// export function addToCart(tiket) {
//     return (dispatch) => {
//         dispatch({
//             type: 'ADD_TO_CART',
//             tiket
//         })
//     }
// }
// export function removeFromCart(tiketId) {
//     return (dispatch) => {
//         dispatch({
//             type: 'REMOVE_FROM_CART',
//             tiketId
//         })
//     }
// }
// export function checkout() {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState()
//             const total = state.tiketModule.cart.reduce((acc, tiket) => acc + tiket.price, 0)
//             const score = await userService.changeScore(-total)
//             dispatch({ type: 'SET_SCORE', score })
//             dispatch({ type: 'CLEAR_CART' })
//             showSuccessMsg('Charged you: $' + total.toLocaleString())
//         } catch (err) {
//             showErrorMsg('Cannot checkout, login first')
//             console.log('TiketActions: err in checkout', err)
//         }
//     }
// }


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