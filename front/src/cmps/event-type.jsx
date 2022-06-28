import { useEffect, useState } from 'react'
import { eventService } from '../services/event.service'
import { useTranslation } from 'react-i18next'
import Children from '../assets/img/Children.svg'
import Cinema from '../assets/img/Cinema.svg'
import Fashion from '../assets/img/Fashion.svg'
import FoodTours from '../assets/img/FoodTours.svg'
import Music from '../assets/img/Music.svg'
import Seniors from '../assets/img/Seniors.svg'
import Sport from '../assets/img/Sport.svg'
import Theater from '../assets/img/Theater.svg'

const Icons = {
    'Music'    : Music,
    'Sport'    : Sport,
    'Theater'  : Theater,
    // 'Standup'  : Standup,
    // 'Lecture'  : Lecture,
    'Cinema'   : Cinema,
    'Children' : Children,
    'Seniors'  : Seniors,
    // 'Circus'   : Circus,
    'Fashion'  : Fashion,
    // 'Gym'      : Gym,
    // 'Festival' : Festival,
    'FoodTours': FoodTours,
    // 'Workshop' : Workshop,
    // 'Other'    : Other
}



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
                       {return  (type !== 'בחר' && type !== 'Select') && <img  src={Icons[type]} onClick={(ev) => showEventByType(ev,type)} className="type-details" value={type === 'Select' ? '' : type}  key={type} />}
                    //    {return  (type !== 'בחר' && type !== 'Select') && <p onClick={(ev) => showEventByType(ev,type)} className="type-details" value={type === 'Select' ? '' : type} data-trans={type} key={type}>{t(`${type}`)}</p>}
                        // {(type !== 'Select' || type !== 'Other') && <li value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</li>}
                    )}
                </div>


            </div>
        </section>
    )
}

