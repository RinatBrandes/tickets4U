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
                              
                <div  className="types-card clean-list" name="eventType" >
                    {eventTypes.map(type =>
                        <p onClick={(ev) => showEventByType(ev,type)} className="type-details" value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</p>
                        // {(type !== 'Select' || type !== 'Other') && <li value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</li>}
                    )}
                </div>


            </div>
        </section>
    )
}

