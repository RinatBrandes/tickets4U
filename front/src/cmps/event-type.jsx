import { useEffect, useState } from 'react'
import { eventService } from '../services/event.service'
// import { loadEvents } from '../store/action/event.actions'
// import { useSelector, useDispatch } from 'react-redux'

export const EventType = ({showEventByType}) => {
    const [eventTypes, setEventTypes] = useState([''])
    // const { events } = useSelector((storeState) => storeState.eventModule)
    // const dispatch = useDispatch()
    
    useEffect(() => {
        const types = eventService.getEventTypes()
        setEventTypes(types)
    }, [])

   

    return (
        <section className="event-types-container">
            <div className="types-contant">
                              
                <ul  className="types-card clean-list" name="eventType" >
                    {eventTypes.map(type =>
                        <li onClick={(ev) => showEventByType(ev,type)} className="type-details" value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</li>
                        // {(type !== 'Select' || type !== 'Other') && <li value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</li>}
                    )}
                </ul>


            </div>
        </section>
    )
}

