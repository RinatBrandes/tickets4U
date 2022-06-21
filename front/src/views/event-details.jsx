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
                <h1 data-trans="eventDetails">Event </h1>
            </div>
            <form  >
                <div className="event-inputs">

                    <label className="event-label" data-trans="eventDate">Event date &#160;</label>
                    <label className="event-label">{currEvent.date}</label>

                    <label className="event-label" data-trans="eventTime">Event hour &#160;{currEvent.time}</label>

                    <label className="event-label" data-trans="eventName">Event name &#160;{currEvent.eventName}</label>

                    <label className="event-label" data-trans="eventType">Event type &#160;{currEvent.eventType}</label>

                    <label className="event-label" data-trans="placeName">Place name &#160;{currEvent.placeName}</label>

                    <label className="event-label" data-trans="eventCity">Event city &#160;{currEvent.eventCity}</label>

                    <label className="event-label" data-trans="eventArea">Event area &#160;{currEvent.eventArea}</label>

                    <label className="event-label" data-trans="eventPricePerCard">Price per ticket &#160;{currEvent.eventPricePerCard}</label>

                    <label className="event-label" data-trans="ticketCount">Ticket quantity &#160;{currEvent.ticketCount}</label>

                    <label className="event-label" data-trans="userRemark">Remark / Extra details &#160;{currEvent.userRemark}</label>


                    <button className="event-btn" data-trans="return" onClick={() => onGoBack()}>Return</button>
                    {loggedInUser && <button className="event-btn" data-trans="update" onClick={() => GoToEdit()}>Update event</button>}
                </div>
            </form>
        </section>
    )
}

export default EventDetails;