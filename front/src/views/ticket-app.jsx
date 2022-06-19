import { useEffect } from "react";
import { loadEvents } from "../store/action/event.actions"; 
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";
import { socketService } from "../services/socket.service.js";

const TicketApp = () => {
    
    const dispatch = useDispatch()
    let { filterBy } = useSelector((storeState) => storeState.eventModule)
    const { events } = useSelector((storeState) => storeState.eventModule)

    useEffect(() => {
        // dispatch(loadEvents())
        socketService.emit('chat topic', 'eventUser')
        socketService.on('eventSaved',refreshEvent() )          

        dispatch(loadEvents(filterBy))
        
        return () => {
            socketService.off('eventSaved',refreshEvent())             
        }
    }, [])


    function refreshEvent() {
        console.log('refreshEvent' )
        dispatch(loadEvents())
    }


    return (
        <section className="ticket-app">
            <EventList events={events} />
        </section>
    )
}

export default TicketApp;