import { useEffect } from "react";
import { useState } from 'react'
import { loadEvents } from "../store/action/event.actions";
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";
import { socketService } from "../services/socket.service.js";
import { EventFilter } from "../cmps/event-filter";
import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service";

const TicketApp = () => {

    const initialFilter = { fromDate: '', toDate: '', eventName: '', eventType: '', eventCity: '', eventArea: '', eventTicketQty: '', eventPricePerCard: '' }

    const dispatch = useDispatch()
    const { events } = useSelector((storeState) => storeState.eventModule)
    const [filterBy, setfilterBy] = useState(initialFilter)


    useEffect(() => {

        socketService.emit('chat topic', 'eventUser')
        socketService.on('eventSaved', refreshEvent)

        dispatch(loadEvents(filterBy))

        return () => {
            socketService.off('eventSaved', refreshEvent)
        }
    }, [])


    useEffect(() => {
        refreshEvent()
    }, [filterBy])

    function refreshEvent() {

        dispatch(loadEvents(filterBy))
    }


    const handleChange = (event) => {

        let value = event.target.value
        const name = event.target.name
        if (name === 'fromDate' || name === 'toDate') {
            const fromDate = utilService.toTimestamp(name === 'fromDate' ? value : filterBy.fromDate)
            const toDate = utilService.toTimestamp(name === 'toDate' ? value : filterBy.toDate)

            if (fromDate && toDate && (toDate < fromDate)) {
                return showErrorMsg('תאריך סיום לא יכול להיות גדול מתאריך התחלה')
            }
        }

        setfilterBy({ ...filterBy, [name]: value })
    }

    // const debouncedHandleChange = utilService.debounce((event) => {

    //     let value = event.target.value
    //     const name = event.target.name
    //     if (name === 'fromDate' || name === 'toDate') {
    //         const fromDate = utilService.toTimestamp(name === 'fromDate' ? value : filterBy.fromDate)
    //         const toDate = utilService.toTimestamp(name === 'toDate' ? value : filterBy.toDate)

    //         if (fromDate && toDate && (toDate < fromDate)) {
    //             return showErrorMsg('תאריך סיום לא יכול להיות גדול מתאריך התחלה')
    //         }
    //     }

    //     setfilterBy({ ...filterBy, [name]: value })
    // },2000)


    const clearSearch = () => {
        setfilterBy(initialFilter)
    }




    return (
        <section className="ticket-app">
            <EventFilter filterBy={filterBy} handleChange={handleChange} refreshEvent={refreshEvent} clearSearch={clearSearch} />
            <EventList events={events} />
        </section>
    )
}

export default TicketApp;