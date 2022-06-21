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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [updateEvent, setUpdateEvent] = useState('עדכון ארוע')
    const [newEvent, setNewEvent] = useState('ארוע חדש')
    const [isNewEvent, setIsNewEvent] = useState(false)
    const [eventTypes, setEventTypes] = useState([''])
    const [currEvent, setCurrEvent] = useState({
        date: '',
        time: '',
        eventName: '',
        eventType: '',
        placeName: '',
        eventCity: '',
        eventArea: '',
        user_id: loggedInUser._id,
        eventPricePerCard: 0,
        ticketCount: '',
        eventStatus: 'new',
        createdAt: Date.now(),
        closeDate: null,
        userRemark: '',
        systemRemark: ''
    })

    useEffect(() => {
        
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
        }
    }, [])


    const handleChange = (event) => {
        let value = event.target.value
        const name = event.target.name;
        if(name === 'eventType' && (value === 'בחר' || value === 'select')) return
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

        if (!isNewEvent) currEventInfo._id = eventId
        console.log('currEventInfo', currEventInfo)
        dispatch(addEvent(currEventInfo, isNewEvent))
        if (isNewEvent) socketService.emit('addedEvent', currEventInfo)
        navigate('/')
    }


    return (
        <section className="event-container">
            <div className="event-title">
                <h1 >{eventId ? updateEvent : newEvent}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="event-inputs">
                    {/* <div className="event-small-container"> */}
                    <label className="event-label"><span data-trans="eventDate">תאריך הארוע</span>
                    <input className="event-input" type="date" name="date" value={currEvent.date} onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span  data-trans="eventTime">שעת הארוע</span>
                    <input className="event-input" type="time" name="time" value={currEvent.time} onChange={(ev) => handleChange(ev)} required /></label>

                    {/* </div> */}


                    <label className="event-label"><span data-trans="eventName">שם הארוע </span>
                    <input className="event-input" type="text" name="eventName" value={currEvent.eventName} onChange={(ev) => handleChange(ev)} required /></label>

                    {currEvent._id && <label className="event-label" data-trans="eventStatus">סטטוס</label>}
                    {currEvent._id && <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventStatus} name="eventStatus" required>
                        <option value="new" data-trans="new">חדש</option>
                        <option value="close" data-trans="close">סגור</option>
                    </select>}



                    <label className="event-label" data-trans="eventType">סוג הארוע</label>
                    <select onChange={handleChange} className="event-input" value={currEvent.eventType} name="eventType" required>
                        {eventTypes.map(type =>
                            <option value={type} data-trans={type} key={type}>{type}</option>
                        )}
                    </select>
                                         


                    <label className="event-label"><span data-trans="placeName">מקום הארוע</span>
                    <input className="event-input" type="text" name="placeName" value={currEvent.placeName} onChange={(ev) => handleChange(ev)} /></label>


                    <label className="event-label"><span data-trans="eventCity">עיר הארוע</span>
                    <input className="event-input" type="text" name="eventCity" value={currEvent.eventCity} onChange={(ev) => handleChange(ev)} /></label>
                    {/* <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventCity} name="eventCity" required>
                               <option value="tiberias" data-trans="tiberias">טבריה</option>
                               <option value="telAviv" data-trans="telAviv">תל אביב</option>
                               <option value="Jerusalem" data-trans="Jerusalem">ירושלים</option>
                        </select>                                                                     */}



                    <label className="event-label" data-trans="eventArea">אזור הארוע</label>
                    <select onChange={(ev) => handleChange(ev)} className="event-input" value={currEvent.eventArea} name="eventArea" required>
                        <option value="south" data-trans="south">דרום</option>
                        <option value="haifa" data-trans="haifa">חיפה</option>
                        <option value="jerusalem" data-trans="jerusalem">ירושלים</option>
                        <option value="center-and-humiliation" data-trans="center-humiliation">מרכז ושפלה</option>
                        <option value="north" data-trans="north">צפון</option>
                        <option value="sharon" data-trans="sharon">שרון</option>
                    </select>


                    <label className="event-label"><span data-trans="eventPricePerCard">מחיר לכרטיס</span>
                    <input className="event-input" type="number" step=".01" name="eventPricePerCard" value={currEvent.eventPricePerCard} onChange={(ev) => handleChange(ev)} required /></label>


                    <label className="event-label"><span data-trans="ticketCount">כמות כרטיסים</span>
                    <input className="event-input" type="number" name="ticketCount" min={0} max={10} value={currEvent.ticketCount} onChange={(ev) => handleChange(ev)} required /></label>

                    <label className="event-label"><span data-trans="userRemark">הערות/פרטים נוספים</span>
                    <textarea className="event-input" type="number" name="userRemark" rows={5} cols={10} value={currEvent.userRemark} onChange={(ev) => handleChange(ev)} /></label>


                    <button className="event-btn" data-trans="save">שמור</button>
                </div>
            </form>
        </section>
    )
}

export default EventEdit;