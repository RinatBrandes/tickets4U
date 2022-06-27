import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getById } from '../store/action/event.actions';
import { i18nService } from '../services/i18n-service';


const EventDetails = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { currEvent } = useSelector((storeState) => storeState.eventModule)
    // const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        
        // onSetLang()
        
        const fetchEvent = async () => {
            dispatch(getById(params.eventId))
        }
        fetchEvent()
        
    }, [])

    
    const onSetLang = (ev) => {
        let lang
        if(ev) {
            lang = ev.target.value
        } else {
            lang = 'he'
        }
        

        i18nService.setLang(lang)
        // If lang is hebrew add RTL class to document.body
        // if (lang === 'he') document.body.classList.add('rtl')
        // else document.body.classList.remove('rtl')
        i18nService.doTrans()
    }
 

    const goToEdit = () => {
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
                    <fieldset className="event-details-fieldset">
                        <legend data-trans="when">When</legend>
                        <label className="event-label" data-trans="eventDate"> &#160; <span>{currEvent.date}</span>Event date</label>
                        {/* <label className="event-label"></label> */}

                        <label className="event-label" data-trans="eventTime">Event hour &#160;{currEvent.time}</label>
                    </fieldset>

                    <fieldset className="event-details-fieldset">
                    <legend data-trans="when">Where</legend>
                        <label className="event-label" data-trans="eventName">Event name &#160;<span>{currEvent.eventName}</span></label>

                        <label className="event-label" data-trans="eventType">Event type &#160;{currEvent.eventType}</label>

                        <label className="event-label" data-trans="placeName">Place name &#160;{currEvent.placeName}</label>

                        <label className="event-label" data-trans="eventCity">Event city &#160;{currEvent.eventCity}</label>

                        <label className="event-label" data-trans="eventArea">Event area &#160;{currEvent.eventArea}</label>
                    </fieldset>

                    <fieldset className="event-details-fieldset">
                    <legend data-trans="whoMuch">Who much</legend>

                        <label className="event-label" data-trans="eventPricePerCard">Price per ticket &#160;{currEvent.eventPricePerCard}</label>

                        <label className="event-label" data-trans="ticketCount">Ticket quantity &#160;{currEvent.ticketCount}</label>

                        <label className="event-label" data-trans="userRemark">Remark / Extra details &#160;{currEvent.userRemark}</label>
                    </fieldset>
                    {currEvent.user &&<fieldset className="event-details-fieldset" >
                        <legend data-trans="contactInformation"> Contact Information</legend>
                        {currEvent.user.firstName && <label className="event-label" data-trans="firstName">First name &#160;{currEvent.user.firstName}</label>}
                        {currEvent.user.lastName && <label className="event-label" data-trans="lastName">Last name &#160;{currEvent.user.lastName}</label>}
                        {currEvent.user.mobile && <label className="event-label" data-trans="mobile">Mobile &#160;{currEvent.user.mobile}</label>}
                        {currEvent.user.email && <label className="event-label" data-trans="email">Email &#160;{currEvent.user.email}</label>}
                   
                        {currEvent.user.email && <div className="contact-user">
                            <a className='contact-seller' href={`https://mail.google.com/mail/?view=cm&source=mailto&to=${currEvent.user.email}`} target="_blank">Contact Seller</a>
                        </div>}
                    </fieldset>}

                    <button className="event-btn" data-trans="return" onClick={() => onGoBack()}>Return</button>
                    {loggedInUser && <button className="event-btn" data-trans="update" onClick={() => goToEdit()}>Update event</button>}
                </div>
            </form>
        </section>
    )
}

export default EventDetails;