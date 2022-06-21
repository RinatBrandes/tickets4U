import { useEffect, useRef } from 'react'
import { eventService } from '../services/event.service'

export const EventFilter = ({ filterBy, handleChange , refreshEvent, clearSearch}) => {


    // let eventTypes = useRef()   
    var eventTypes
    useEffect(() => {
        eventTypes = eventService.getEventTypes()
        console.log('eventTypes',eventTypes )
    }, [])

    console.log('eventTypes',eventTypes )
    return (
        <section className="filter-container">
            <div className="filter-contant">
                <div className="filter-event-name">
                    <label className="filter-label" ><span data-trans="eventName">שם הארוע</span>
                    <input className="search-filter" name="eventName" type="search" placeholder="Search..." value={filterBy.eventName} onChange={handleChange} /></label>
                </div>


                {/* <label className="event-label" data-trans="eventType">סוג הארוע</label>
                    <select  onChange={handleChange} className="event-input" value={filterBy.eventType} name="eventType" >
                        {eventTypes.map(type =>
                            <option value={type} data-trans={type}>{type}</option>
                        )}
                    </select>  */}


                <div className="filter-event-city">
                    <label className="filter-label" ><span data-trans="eventCity">עיר הארוע</span>
                    <input className="search-filter" name="eventCity" type="search" placeholder="Search..." value={filterBy.eventCity} onChange={handleChange} /></label>
                </div>

                <label className="event-label" data-trans="eventArea">אזור הארוע</label>
                    <select onChange={handleChange} className="event-input" value={filterBy.eventArea} name="eventArea">
                        <option value="selectOption" data-trans="selectOption">בחר</option>
                        <option value="south" data-trans="south">דרום</option>
                        <option value="haifa" data-trans="haifa">חיפה</option>
                        <option value="jerusalem" data-trans="jerusalem">ירושלים</option>
                        <option value="center-and-humiliation" data-trans="center-humiliation">מרכז ושפלה</option>
                        <option value="north" data-trans="north">צפון</option>
                        <option value="sharon" data-trans="sharon">שרון</option>
                    </select>

                <div className="filter-event-name">
                    <label className="filter-label" ><span data-trans="eventTicketQty">כמות כרטיסים</span>
                    <input className="search-filter" name="eventTicketQty" type="search" placeholder="Search..." value={filterBy.eventTicketQty} onChange={handleChange} /></label>
                </div>
                    
                <div className="filter-event-name">
                    <label className="filter-label" ><span data-trans="eventPricePerCard">מחיר לכרטיס</span>
                    <input className="search-filter" name="eventPricePerCard" type="search" placeholder="Search..." value={filterBy.eventPricePerCard} onChange={handleChange} /></label>
                </div>
                
                

                <button className="filter-btn" data-trans="search" onClick={refreshEvent}>חפש</button>
                <button className="filter-btn" data-trans="clearSearch" onClick={clearSearch}>נקה</button>
            </div>
        </section>
    )
}

// export default EventFilter;