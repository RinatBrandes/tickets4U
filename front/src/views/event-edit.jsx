import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
import { socketService } from '../services/socket.service'
import { useParams } from 'react-router-dom'
import { eventService } from '../services/event.service'
// import { i18nService } from '../services/i18n-service'
import { utilService } from '../services/util.service'
import { useTranslation } from 'react-i18next'


const EventEdit = () => {
    const { t } = useTranslation()
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const initialEvent  = {date: '', time: '', eventName: '', eventType: '', placeName: '',eventCity: '', eventArea: '', user_id: loggedInUser._id,
        eventPricePerCard: 0, ticketCount: '', eventStatus: 'new', createdAt: Date.now(), closeDate: null, userRemark: '', systemRemark: ''}
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [updateEvent, setUpdateEvent] = useState('עדכון ארוע')
    const [newEvent, setNewEvent] = useState('ארוע חדש')
    const [isNewEvent, setIsNewEvent] = useState(false)
    const [eventTypes, setEventTypes] = useState([''])
    const [currEvent, setCurrEvent] = useState(initialEvent)

    useEffect(() => {
        // onSetLang()
        const fetchEvent = async () => {
            const selectedEvent = await eventService.getById(eventId)
            setCurrEvent(selectedEvent)
        }
        
       
        const types = eventService.getEventTypes()
        setEventTypes(types)
        
        if (eventId) {
            fetchEvent()
            setIsNewEvent(false)
        } else {
            setIsNewEvent(true)
            setCurrEvent(initialEvent)
        }
    }, [eventId])

  
    
    const handleChange = (event) => {
        let value = event.target.value
        const name = event.target.name;
        if(name === 'eventType' && (value === 'בחר' || value === 'select')) value = ''
        setCurrEvent({ ...currEvent, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      console.log('data.get(date)', data.get('date'))
      console.log('utilService.toTimestamp(data.get(date))',utilService.toTimestamp(data.get('date')) )
      console.log('new date', new Date())
      console.log('date now', Date.now())
        const currEventInfo = {
            date: utilService.toTimestamp(data.get('date')),
            time: data.get('time'),
            eventName: data.get('eventName'),
            eventType: data.get('eventType'),
            placeName: data.get('placeName'),
            eventCity: data.get('eventCity'),
            eventArea: data.get('eventArea'),
            userId: loggedInUser._id,
            eventPricePerCard: +data.get('eventPricePerCard'),
            ticketCount: +data.get('ticketCount'),
            eventStatus: 'new',
            createdAt: Date.now(),
            closeDate: null,
            userRemark: data.get('userRemark'),
            systemRemark: ''
        }
console.log('', currEventInfo.date)
        if (!isNewEvent) currEventInfo._id = eventId
        console.log('currEventInfo', currEventInfo)
        dispatch(addEvent(currEventInfo, isNewEvent))
        if (isNewEvent) socketService.emit('addedEvent', currEventInfo)
        navigate(-1)
    }

    return (
        <section className="event-container">
            <div className="event-title">
                <h1 >{eventId ? t('updateEvent') : t('newEvent')}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="event-inputs">
                    
                    <label className="event-label"><span>&#160;{t('eventDate')}</span>
                    <input className="event-input" type="date" name="date" value={currEvent.date}  onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span>{t('eventTime')}</span>
                    <input className="event-input" type="time" name="time" value={currEvent.time} onChange={(ev) => handleChange(ev)} required /></label>

                    
                    <label className="event-label"><span>{t('eventName')} </span>
                    <input className="event-input" type="text" name="eventName" value={currEvent.eventName} onChange={(ev) => handleChange(ev)} required /></label>

                    {currEvent._id && <label className="event-label">{t('eventStatus')}</label>}
                    {currEvent._id && <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventStatus} name="eventStatus" required>
                        <option value="new">{t('new')}</option>
                        <option value="close">{t('close')}</option>
                    </select>}

                    <label className="event-label">{t('eventType')}</label>
                    <select onChange={handleChange} className="event-input" value={currEvent.eventType} name="eventType" required>
                        {eventTypes.map(type =>
                            <option value={type === 'Select' ? '' : type} data-trans={type} key={type} >{t(`${type}`)}</option>
                        )}
                    </select>                                                                                       

                    <label className="event-label"><span>{t('placeName')}</span>
                    <input className="event-input" type="text" name="placeName" value={currEvent.placeName} onChange={(ev) => handleChange(ev)} /></label>

                    <label className="event-label"><span>{t('eventCity')}</span>
                    <input className="event-input" type="text" name="eventCity" value={currEvent.eventCity} onChange={(ev) => handleChange(ev)} /></label>                                                                 

                    <label className="event-label">{t('eventArea')}</label>
                    <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventArea} name="eventArea" required>
                        <option value="">{t('Select')}</option>
                        <option value="south">{t('south')}</option>
                        <option value="haifa">{t('haifa')}</option>
                        <option value="jerusalem">{t('jerusalem')}</option>
                        <option value="center-and-humiliation">{t('center_humiliation')}</option>
                        <option value="north">{t('north')}</option>
                        <option value="sharon">{t('sharon')}</option>
                    </select>


                    <label className="event-label"><span>{t('eventPricePerCard')}</span>
                    <input className="event-input" type="number" step=".01" name="eventPricePerCard" value={currEvent.eventPricePerCard} onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span>{t('ticketCount')}</span>
                    <input className="event-input" type="number" name="ticketCount" min={0} max={10} value={currEvent.ticketCount} onChange={(ev) => handleChange(ev)} required /></label>

                    <label className="event-label"><span>{t('ticketPlace')}</span>
                    <input className="event-input" type="test" name="ticketPlace"  value={currEvent.ticketPlace} onChange={(ev) => handleChange(ev)} placeholder={t('ticketPlaceExp')} /></label>
                    
                    <label className="event-label"><span>{t('userRemark')}</span>
                    <textarea className="event-input" type="number" name="userRemark" rows={5} cols={10} value={currEvent.userRemark} onChange={(ev) => handleChange(ev)} /></label>


                    <button className="event-btn">{t('save')}</button>
                </div>
            </form>
        </section>
    )

}

export default EventEdit;