import { useEffect, useState } from 'react'
import { eventService } from '../services/event.service'
import { useTranslation } from 'react-i18next'


export const EventType = ({showEventByType}) => {
    const [eventTypes, setEventTypes] = useState([''])
    const { t } = useTranslation()
    
    useEffect(() => {
        const types = eventService.getEventTypes()
        setEventTypes(types)
    }, [])

   

    return (
        <section className="event-types-container">
            <div className="types-contant">
                              
                <div  className="types-card clean-list" name="eventType" >
                    {eventTypes.map(type => 
                       {return  (type !== 'בחר' && type !== 'Select') && <p onClick={(ev) => showEventByType(ev,type)} className="type-details" value={type === 'Select' ? '' : type} data-trans={type} key={type}>{t(`${type}`)}</p>}
                        // {(type !== 'Select' || type !== 'Other') && <li value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</li>}
                    )}
                </div>


            </div>
        </section>
    )
}

