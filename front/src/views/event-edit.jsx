import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
import { socketService } from '../services/socket.service'
import { useParams } from 'react-router-dom'
import { eventService } from '../services/event.service'
import { i18nService } from '../services/i18n-service'
import { utilService } from '../services/util.service'


const EventEdit = () => {
    
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
        onSetLang()
        const fetchEvent = async () => {
            const selectedEvent = await eventService.getById(eventId)
            setCurrEvent(selectedEvent)
        }
        
        setUpdateEvent(i18nService.getTrans('update_event'))
        setNewEvent(i18nService.getTrans('new_event'))
        
        
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

    const onSetLang = (ev) => {
        let lang
        if(ev) {
            lang = ev.target.value
        } else {
            lang = 'he'
        }
        
        i18nService.setLang(lang)
        // If lang is hebrew add RTL class to document.body
        if (lang === 'he') document.body.classList.add('rtl')
        else document.body.classList.remove('rtl')
        i18nService.doTrans()
    }
    
    const handleChange = (event) => {
        let value = event.target.value
        const name = event.target.name;
        if(name === 'eventType' && (value === 'בחר' || value === 'select')) value = ''
        setCurrEvent({ ...currEvent, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
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
                <h1 >{eventId ? updateEvent : newEvent}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="event-inputs">
                    
                    <label className="event-label"><span data-trans="eventDate">&#160;Event date</span>
                    <input className="event-input" type="date" name="date" value={currEvent.date}  onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span  data-trans="eventTime">Event hour</span>
                    <input className="event-input" type="time" name="time" value={currEvent.time} onChange={(ev) => handleChange(ev)} required /></label>

                    
                    <label className="event-label"><span data-trans="eventName">Event name </span>
                    <input className="event-input" type="text" name="eventName" value={currEvent.eventName} onChange={(ev) => handleChange(ev)} required /></label>

                    {currEvent._id && <label className="event-label" data-trans="eventStatus">Event status</label>}
                    {currEvent._id && <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventStatus} name="eventStatus" required>
                        <option value="new" data-trans="new">New</option>
                        <option value="close" data-trans="close">Close</option>
                    </select>}

                    <label className="event-label" data-trans="eventType">Event type</label>
                    <select onChange={handleChange} className="event-input" value={currEvent.eventType} name="eventType" required>
                        {eventTypes.map(type =>
                            <option value={type === 'Select' ? '' : type} data-trans={type} key={type} >{type}</option>
                        )}
                    </select>                                                                                       

                    <label className="event-label"><span data-trans="placeName">Place name</span>
                    <input className="event-input" type="text" name="placeName" value={currEvent.placeName} onChange={(ev) => handleChange(ev)} /></label>

                    <label className="event-label"><span data-trans="eventCity">Event city</span>
                    <input className="event-input" type="text" name="eventCity" value={currEvent.eventCity} onChange={(ev) => handleChange(ev)} /></label>                                                                 

                    <label className="event-label" data-trans="eventArea">Event area</label>
                    <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventArea} name="eventArea" required>
                        <option value="south" data-trans="south">South</option>
                        <option value="haifa" data-trans="haifa">Haifa</option>
                        <option value="jerusalem" data-trans="jerusalem">Jerusalem</option>
                        <option value="center-and-humiliation" data-trans="center_humiliation">Center && Humiliation</option>
                        <option value="north" data-trans="north">North</option>
                        <option value="sharon" data-trans="sharon">Sharon</option>
                    </select>


                    <label className="event-label"><span data-trans="eventPricePerCard">Price per ticket</span>
                    <input className="event-input" type="number" step=".01" name="eventPricePerCard" value={currEvent.eventPricePerCard} onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span data-trans="ticketCount">Ticket quantity</span>
                    <input className="event-input" type="number" name="ticketCount" min={0} max={10} value={currEvent.ticketCount} onChange={(ev) => handleChange(ev)} required /></label>

                    <label className="event-label"><span data-trans="userRemark">Remarks / Extra details</span>
                    <textarea className="event-input" type="number" name="userRemark" rows={5} cols={10} value={currEvent.userRemark} onChange={(ev) => handleChange(ev)} /></label>


                    <button className="event-btn" data-trans="save">Save</button>
                </div>
            </form>
        </section>
    )

}

export default EventEdit;