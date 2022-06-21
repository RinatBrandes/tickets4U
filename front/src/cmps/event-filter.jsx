import { useEffect, useState } from 'react'
import { eventService } from '../services/event.service'

export const EventFilter = ({ filterBy, handleChange, refreshEvent, clearSearch }) => {
    const [eventTypes, setEventTypes] = useState([''])



    useEffect(() => {
        const types = eventService.getEventTypes()
        setEventTypes(types)
    }, [])


    return (
        <section className="filter-container">
            <div className="filter-contant">
                <div className="filter-event-name">
                    <label className="filter-label" ><span data-trans="eventName">Event name</span>&#160;
                        <input className="search-filter" name="eventName" type="search" placeholder="Search..." value={filterBy.eventName} onChange={handleChange} /></label>
                </div>


                <label><span  className="event-label" data-trans="eventType">Event type</span>&#160;
                <select onChange={handleChange} className="event-input" value={filterBy.eventType} name="eventType" >
                    {eventTypes.map(type =>
                        <option data-trans={type} value={type === 'Select' ? '' : type}  key={type}>{type}</option>
                    )}
                </select></label>


                <div className="filter-event-city">
                    <label className="filter-label" ><span data-trans="eventCity">Event city</span>&#160;
                        <input className="search-filter" name="eventCity" type="search" placeholder="Search..." value={filterBy.eventCity} onChange={handleChange} /></label>
                </div>

                <label><span  className="event-label" data-trans="eventArea">Event Area</span>&#160;
                <select onChange={handleChange} className="event-input" value={filterBy.eventArea} name="eventArea">
                    <option value="" data-trans="selectOption">Select</option>
                    <option value="south" data-trans="south">South</option>
                    <option value="haifa" data-trans="haifa">Haifa</option>
                    <option value="jerusalem" data-trans="jerusalem">Jerusalem</option>
                    <option value="center-and-humiliation" data-trans="center-humiliation">Center & Humiliation</option>
                    <option value="north" data-trans="north">North</option>
                    <option value="sharon" data-trans="sharon">Sharon</option>
                </select></label>

                <div className="filter-event-ticketQty">
                    <label><span  className="filter-label" data-trans="eventTicketQty">Ticket quantity</span>&#160;
                        <input className="search-filter" name="eventTicketQty" type="number" placeholder="Search..." value={filterBy.eventTicketQty} onChange={handleChange} /></label>
                </div>

                <div className="filter-event-price">
                    <label><span  className="filter-label" data-trans="eventPricePerCard">Price per card</span>&#160;
                        <input className="search-filter" name="eventPricePerCard" type="number" step=".01" placeholder="Search..." value={filterBy.eventPricePerCard} onChange={handleChange} /></label>
                </div>

                <div className="filter-event-date">
                    <label><span className="filter-label"  data-trans="fromDate">From date</span>&#160;
                        <input className="search-filter" name="fromDate" type="date" placeholder="Search..." value={filterBy.fromDate} onChange={handleChange} />&#160;</label>

                    <label><span  className="filter-label" data-trans="toDate">To date</span>&#160;
                        <input className="search-filter" name="toDate" type="date" placeholder="Search..." value={filterBy.toDate} onChange={handleChange} /></label>

                </div>

                <button className="filter-btn" data-trans="search" onClick={refreshEvent}>Search</button>
                <button className="filter-btn" data-trans="clearSearch" onClick={clearSearch}>Clear</button>
            </div>
        </section>
    )
}

