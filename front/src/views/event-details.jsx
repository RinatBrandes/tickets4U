import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getById } from '../store/action/event.actions';


const EventDetails = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { currEvent } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        dispatch(getById(params.eventId))

    }, [])


    const GoToEdit = () => {
        navigate(`/event/edit/${currEvent._id}`)
    }

    const onGoBack = () => {
        navigate('/')
    }


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

                    <label className="event-label" data-trans="eventArea">אזור הארוע&#160;{currEvent.eventArea}</label>

                    <label className="event-label" data-trans="eventPricePerCard">מחיר לכרטיס&#160;{currEvent.eventPricePerCard}</label>

                    <label className="event-label" data-trans="ticketCount">כמות כרטיסים&#160;{currEvent.ticketCount}</label>

                    <label className="event-label" data-trans="userRemark">הערות/פרטים נוספים&#160;{currEvent.userRemark}</label>


                    <button className="event-btn" data-trans="return" onClick={() => onGoBack()}>חזור</button>
                    {loggedInUser && <button className="event-btn" data-trans="update" onClick={() => GoToEdit()}> עדכון ארוע</button>}
                </div>
            </form>
        </section>
    )
}

export default EventDetails;