import { useEffect } from "react";
import { useState } from 'react'
import { loadEvents } from "../store/action/event.actions";
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";
import { socketService } from "../services/socket.service.js";
import { EventFilter } from "../cmps/event-filter";

const TicketApp = () => {

    const dispatch = useDispatch() 
    const { events } = useSelector((storeState) => storeState.eventModule)
    const [filterBy, setfilterBy] = useState({
        txt: '',
        date: '',
        eventName: '',
        eventType: '',
        eventCity: '',
        eventArea: '',
        eventTicketQty: '',
        eventPricePerCard: '',
        userId: ''
    })


    useEffect(() => {

        socketService.emit('chat topic', 'eventUser')
        socketService.on('eventSaved', refreshEvent)

        dispatch(loadEvents(filterBy))

        return () => {
            socketService.off('eventSaved', refreshEvent)
        }
    }, [])

    function refreshEvent() {
        dispatch(loadEvents(filterBy))
    }


    const handleChange = (event) => {

        let value = event.target.value
        const name = event.target.name
        
        if(value === 'selectOption') return
        setfilterBy({ ...filterBy, [name]: value })
    }

    const clearSearch = (event) => {
        const name = event.target.name
        const value = ''
        setfilterBy({  date: '', eventName: '', eventType: '', eventCity: '', eventArea: '', eventTicketQty: '', eventPricePerCard: ''})
        refreshEvent(filterBy)
    }

    return (
        <section className="ticket-app">
            <EventFilter filterBy={filterBy} handleChange={handleChange} refreshEvent={refreshEvent} clearSearch={clearSearch}/>
            <EventList events={events} />
        </section>
    )
}

export default TicketApp;