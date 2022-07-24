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
import format from 'date-fns/format'

const EventEdit = () => {
    const { t } = useTranslation()
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const now = new Date()
    const initialEvent = {
        date: now, time: now.getTime(), eventName: '', eventType: t('Select'), placeName: '', eventCity: '', eventArea: '', user_id: loggedInUser._id,
        eventPricePerCard: 0, ticketCount: '', eventStatus: 'new', createdAt: Date.now(), closeDate: null, userRemark: '', systemRemark: '', ticketPlace: ''
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    // const [updateEvent, setUpdateEvent] = useState('עדכון ארוע')
    // const [newEvent, setNewEvent] = useState('ארוע חדש')
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
        const name = event.target.name        
        if (name === 'eventType' && (value === 'בחר' || value === 'select')) value = ''
        if (name === 'date') value = new Date(value)       
        setCurrEvent({ ...currEvent, [name]: value })        
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        // console.log('data.get(date)', data.get('date'))
        // console.log('utilService.toTimestamp(data.get(date))', utilService.toTimestamp(data.get('date')))
        // console.log('new date', new Date())
        // console.log('date now', Date.now())
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
            systemRemark: '',
            ticketPlace: data.get('ticketPlace')
        }
        console.log('', currEventInfo.date)
        if (!isNewEvent) currEventInfo._id = eventId
        console.log('currEventInfo', currEventInfo)
        dispatch(addEvent(currEventInfo, isNewEvent))
        if (isNewEvent) socketService.emit('addedEvent', currEventInfo)
        navigate(-1)
    }

    if(!currEvent.date && currEvent._id)  return <h1>"Loading..."</h1>
    
    return (
        <section className="main-container">
            <div className="main-left"></div>
            <div className="main-main">
                    <div className="event-edit-title">
                        <h1 >{eventId ? t('updateEvent') : t('newEvent')}</h1>
                    </div>
                <div className="event-edit-container">
                    <form className="event-edit-form" onSubmit={handleSubmit} >
                        {/* <div className="event-inputs"> */}
                            <div className="event-edit-titles">
                                <label className="event-label"><span>{t('eventDate')}</span></label>
                                <label className="event-label inline"><span>{t('eventTime')}</span></label>
                                <label className="event-label"><span>{t('eventName')} </span></label>

                                {currEvent._id && <label className="event-label">{t('eventStatus')}</label>}

                                <label className="event-label">{t('eventType')}</label>

                                <label className="event-label"><span>{t('placeName')}</span></label>
                                <label className="event-label"><span>{t('eventCity')}</span></label>
                                <label className="event-label">{t('eventArea')}</label>
                                <label className="event-label"><span>{t('eventPricePerCard')}</span></label>
                                <label className="event-label"><span>{t('ticketCount')}</span></label>

                                <label className="event-label"><span>{t('ticketPlace')}</span></label>
                                <label className="event-label"><span>{t('userRemark')}</span></label>
                            </div>

                            <div className="event-edit-content">
                                <input className="event-edit-input" type="date" name="date" value={format(currEvent.date,"yyyy-MM-dd")}  onChange={(ev) => handleChange(ev)} required />
                                <input className="event-edit-input" type="time" name="time" value={currEvent.time} onChange={(ev) => handleChange(ev)} required />
                                <input className="event-edit-input" type="text" name="eventName" value={currEvent.eventName} onChange={(ev) => handleChange(ev)} required />

                                {currEvent._id && <select onChange={(ev) => handleChange(ev)} className="event-edit-select" value={currEvent.eventStatus} name="eventStatus" required>
                                    <option value="new">{t('new')}</option>
                                    <option value="close">{t('close')}</option>
                                </select>}

                                <select onChange={(ev) => handleChange(ev)} className="event-edit-select" value={currEvent.eventType} name="eventType" required>
                                    {eventTypes.map(type =>
                                        <option value={type === 'Select' ? '' : type}  key={type} >{t(`${type}`)}</option>
                                    )}
                                </select>
                                
                                <input className="event-edit-input" type="text" name="placeName" value={currEvent.placeName} onChange={(ev) => handleChange(ev)} />
                                <input className="event-edit-input" type="text" name="eventCity" value={currEvent.eventCity} onChange={(ev) => handleChange(ev)} />
                                <select onChange={(ev) => handleChange(ev)} className="event-edit-select" value={currEvent.eventArea} name="eventArea" required>
                                    <option value={t('select')}>{t('Select')}</option>
                                    <option value={t('south')}>{t('south')}</option>
                                    <option value={t('haifa')}>{t('haifa')}</option>
                                    <option value={t('jerusalem')}>{t('jerusalem')}</option>
                                    <option value={t('center_humiliation')}>{t('center_humiliation')}</option>
                                    <option value={t('north')}>{t('north')}</option>
                                    <option value={t('sharon')}>{t('sharon')}</option>
                                </select>
                            
                                <input className="event-edit-input" type="number" step=".01" name="eventPricePerCard" value={currEvent.eventPricePerCard} onChange={(ev) => handleChange(ev)} required />
                                <input className="event-edit-input" type="number" name="ticketCount" min={0} max={10} value={currEvent.ticketCount} onChange={(ev) => handleChange(ev)} required />

                                <input className="event-edit-input" type="test" name="ticketPlace" value={currEvent.ticketPlace} onChange={(ev) => handleChange(ev)} placeholder={t('ticketPlaceExp')} />
                                <textarea className="event-edit-txtarea" type="number" name="userRemark" rows={6} cols={10} value={currEvent.userRemark} onChange={(ev) => handleChange(ev)} />
                            </div>

                            <div className="event-edit-btn-container">

                                <button className="event-edit-btn">{t('save')}</button>
                            </div>

                        {/* </div> */}
                    </form>
                </div>
            </div>
            <div className="main-right"></div>
        </section>
    )

}

export default EventEdit;