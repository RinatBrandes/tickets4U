
import { httpService } from './http.service'



export const eventService = {
    // loadEventTypes,
    save,
    query,
    getById

}

async function query(filterBy = {}) {

    const { txt = '', date = '', eventName  = '', eventType  = '', eventCity  = '',eventArea = '',evenPricePerCard = 0,eventTicketQty =1, sortBy = 'title' } = filterBy
    const url = `?txt=${txt}&date=${date}&eventName=${eventName}&eventType=${eventType}&eventCity=${eventCity}&eventArea=${eventArea}&evenPricePerCard=${evenPricePerCard}&eventTicketQty=${eventTicketQty}&sortBy=${sortBy}`
    const urlToRequest = 'event/' + url
    // let gigs = await storageService.query(STORAGE_KEY)
    let events = await httpService.get(urlToRequest)

    return events
}



async function getById(eventId) {
    // return storageService.get(STORAGE_KEY, gigId)
    let event = await httpService.get(`event/${eventId}`)
    console.log('event', event)
    return event
}

async function save(currEvent) {

    if (currEvent._id) {
        await httpService.put(`event/${currEvent._id}`, currEvent)
        return currEvent
    } else {
        const newEvent = await httpService.post('event', currEvent)
        // eventChannel.postMessage(getActionAddEvent(newEvent))
        return newEvent
    }

}


// async function loadEventTypes() {
//     try {
//         let events = await httpService.get('event')
//         return events
//     } catch (err) {
//         console.dir(err)
//         // showErrorMsg(err)
//         throw err
//     }
// }
