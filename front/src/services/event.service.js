import { httpService } from './http.service'

const eventType_he = ["בחר","ספורט", "תאטרון", "סטנדאפ", "מוזיקה", "הרצאה", "קולנוע", "ילדים", "גיל הזהב", "קרקס", "אופנה", "מכון כושר", "פסטיבל", "סיורי אוכל", "סדנה", "אחר", "הכל"]
const eventType = ["Select","Sport","Theater","Music","Cinema","Children","Seniors","Fashion","FoodTours", "Other"]
// const eventType = ["Select","Sport","Theater","Standup","Music","Lecture","Cinema","Children","Seniors","Circus","Fashion","Gym","Festival","FoodTours","Workshop", "Other"]
export const eventService = {
    save,
    query,
    getById,
    getEventTypes

}

async function query(filterBy = {}) {
    
 
    const { txt = '', fromDate = '', toDate = '', eventName = '', eventType = '', eventCity = '', eventArea = '', eventPricePerCard = '', eventTicketQty = '', userId = '', allDate = false, sortBy = 'date' } = filterBy
    const url = `?txt=${txt}&fromDate=${fromDate}&toDate=${toDate}&eventName=${eventName}&eventType=${eventType}&eventCity=${eventCity}&eventArea=${eventArea}&eventPricePerCard=${eventPricePerCard}&eventTicketQty=${eventTicketQty}&userId=${userId}&allDate=${allDate}&sortBy=${sortBy}`
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
    let event = await httpService.get(`event/${eventId}`)    
    event.date =  new Date(event.date * 1000)
    return event 
}

async function save(currEvent) {

    if (currEvent._id) {

        await httpService.put(`event/${currEvent._id}`, currEvent)
        return currEvent
    } else {
        const newEvent = await httpService.post('event', currEvent)
        return newEvent
    }

}
