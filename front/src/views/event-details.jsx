import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
import { getById } from '../store/action/event.actions'; 
import { socketService } from '../services/socket.service'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import {eventService} from '../services/event.service.js'

const EventDetails = () => {
    const { loggedInUser} = useSelector((storeState) => storeState.userModule)
    const { currEvent } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    // const [currEvent, setCurrEvent] = useState({
    //     date: '',
    //     time: '',
    //     eventName: '',
    //     eventType: '',
    //     placeName: '',
    //     eventCity: '',
    //     eventArea: '',
    //     user_id: loggedInUser._id,
    //     eventPricePerCard: 0,
    //     ticketCount: 0,
    //     eventStatus: 'new',
    //     createdAt: Date.now(),
    //     closeDate: null,
    //     userRemark: '',
    //     systemRemark:''
    // })
    console.log('in event details' )
    console.log('params.eventId',params.eventId )
    
    useEffect(() => {
        // dispatch(loadEvents())
        dispatch(getById(params.eventId))
        
    }, [])


    // const handleChange = (event) => {
    //     let value = event.target.value;
    //     const name = event.target.name;              
    //     setCurrEvent({ currEvent: { ...currEvent, name: value } });
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();        
    //     const data = new FormData(event.currentTarget);  
         
    //     const currEventInfo = {
          
    //         date:  data.get('date'),
    //         time:  data.get('time'),
    //         eventName:  data.get('eventName'),
    //         eventType:  data.get('eventType'),
    //         placeName:  data.get('placeName'),
    //         eventCity:  data.get('eventCity'),
    //         eventArea:  data.get('eventArea'),
    //         userId: loggedInUser._id,
    //         eventPricePerCard:  data.get('eventPricePerCard'),
    //         ticketCount:  data.get('ticketCount'),
    //         eventStatus: 'new',
    //         createdAt: Date.now(),
    //         closeDate: null,
    //         userRemark:  data.get('userRemark'),
    //         systemRemark:''   
    //     }

    //         console.log('currEventInfo',currEventInfo )
    //         dispatch(addEvent(currEventInfo))       
    //         socketService.emit('addedEvent',currEventInfo)     
    //         navigate('/')
    // }

    const GoToEdit = () => {
        navigate(`/event/${currEvent._id}`)
    }

    const onGoBack = () => {
        navigate('/')
    }

 console.log('currEvent',currEvent)
 if (!currEvent) return <h1>Loading</h1>
    return (
        <section className="event-container">
            <div className="event-title" >
                <h1 data-trans="eventDetails" >ארוע </h1>
            </div>
            <form  >
                <div className="event-inputs">
                 
                        <label className="event-label" data-trans="eventDate">תאריך הארוע &#160;</label>
                        <label className="event-label">{currEvent.date}</label>
                                                                        
                        <label className="event-label" data-trans="eventTime">שעת הארוע&#160;{currEvent.time}</label>
                                
                        <label className="event-label" data-trans="eventName">שם הארוע &#160;{currEvent.eventName}</label>
                                                
                        <label className="event-label" data-trans="eventType">סוג הארוע&#160;{currEvent.eventType}</label>
                                
                        <label className="event-label" data-trans="placeName"> שם מקום הארוע&#160;{currEvent.placeName}</label>
                        
                        <label className="event-label" data-trans="eventCity">עיר הארוע&#160;{currEvent.eventCity}</label>                        
        
                        <label className="event-label"  data-trans="eventArea">אזור הארוע&#160;{currEvent.eventArea}</label>        

                        <label className="event-label" data-trans="eventPricePerCard">מחיר לכרטיס&#160;{currEvent.eventPricePerCard}</label>
        
                        <label className="event-label" data-trans="ticketCount">כמות כרטיסים&#160;{currEvent.ticketCount}</label>                        
                    
                        <label className="event-label" data-trans="userRemark">הערות/פרטים נוספים&#160;{currEvent.userRemark}</label>
                        
        
                        <button className="event-btn" data-trans="return" onClick={() => onGoBack()}>חזור</button>
                    <button className="event-btn" data-trans="update" onClick={() => GoToEdit()}> עדכון ארוע</button>
                </div>
            </form>
        </section>
    )
}

export default EventDetails;