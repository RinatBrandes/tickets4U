import { httpService } from './http.service'
const eventType = ["ספורט", "תאטרון", "סטנדאפ", "מוזיקה", "הרצאה", "קולנוע", "ילדים", "גיל הזהב", "קרקס", "אופנה", "מכון כושר", "פסטיבל", "סיורי אוכל", "סדנה", "אחר"]
export const eventService = {
    save,
    query,
    getById,
    getEventTypes

}

async function query(filterBy = {}) {

    const { txt = '', date = '', eventName = '', eventType = '', eventCity = '', eventArea = '', eventPricePerCard = '', eventTicketQty = '', userId = '', sortBy = 'date' } = filterBy
    const url = `?txt=${txt}&date=${date}&eventName=${eventName}&eventType=${eventType}&eventCity=${eventCity}&eventArea=${eventArea}&eventPricePerCard=${eventPricePerCard}&eventTicketQty=${eventTicketQty}&userId=${userId}&sortBy=${sortBy}`
    let urlToRequest
    if (filterBy.userId !== null) urlToRequest = 'event/user' + url
    urlToRequest = 'event/' + url    
    let events = await httpService.get(urlToRequest)

    return events
}

function getEventTypes(){
    return eventType
}

async function getById(eventId) {
    // return storageService.get(STORAGE_KEY, gigId)
    let event = await httpService.get(`event/${eventId}`)
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
