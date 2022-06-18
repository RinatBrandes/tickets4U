import { useEffect } from "react";
import { loadEvents } from "../store/action/event.actions"; 
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";

const TicketApp = () => {
    
    const dispatch = useDispatch()
    let { filterBy } = useSelector((storeState) => storeState.eventModule)
    const { events } = useSelector((storeState) => storeState.eventModule)
    useEffect(() => {
        // dispatch(loadEvents())
        dispatch(loadEvents(filterBy))
    }, [])



console.log('events', events)
console.log('filterBy', filterBy)
    return (
        <section className="ticket-app">
            <EventList events={events} />
        </section>
    )
}

export default TicketApp;