import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getById } from '../store/action/event.actions';
// import { i18nService } from '../services/i18n-service';
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'

const EventDetails = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { currEvent } = useSelector((storeState) => storeState.eventModule)
    // const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { t } = useTranslation()

    useEffect(() => {
        
        const fetchEvent = async () => {
            dispatch(getById(params.eventId))
        }
        fetchEvent()
        
    }, [])

  

    const goToEdit = () => {
        navigate(`/event/edit/${currEvent._id}`)
    }

    const onGoBack = () => {
        navigate('/')
    }


    if (!currEvent) return <h1>Loading</h1>
    console.log('currEvent',currEvent )
    return (
        <section className="event-container">
            <div className="event-title" >
                <h1 data-trans="eventDetails">Event </h1>
            </div>
            <form  >
                <div className="event-inputs">
                    <fieldset className="event-details-fieldset">
                        <legend data-trans="when">When</legend>
                        <label className="event-label">{t('eventDate')} &#160;<span>{t(`${format(currEvent.date,"yyyy-MM-dd")}`)}</span></label>
                        {/* <label className="event-label"></label> */}

                        <label className="event-label">{t('eventTime')} &#160;{currEvent.time}</label>
                    </fieldset>

                    <fieldset className="event-details-fieldset">
                    <legend data-trans="when">Where</legend>
                        <label className="event-label">{t('eventName')} &#160;<span>{currEvent.eventName}</span></label>

                        <label className="event-label">{t('eventType')} &#160;{currEvent.eventType}</label>

                        <label className="event-label">{t('placeName')} &#160;{currEvent.placeName}</label>

                        <label className="event-label">{t('eventCity')} &#160;{currEvent.eventCity}</label>

                        <label className="event-label">{t('eventArea')} &#160;{currEvent.eventArea}</label>
                    </fieldset>

                    <fieldset className="event-details-fieldset">
                    <legend>{t('whoMuch')}</legend>

                        <label className="event-label">{t('eventPricePerCard')} &#160;{currEvent.eventPricePerCard}</label>

                        <label className="event-label">{t('ticketCount')} &#160;{currEvent.ticketCount}</label>

                        <label className="event-label">{t('ticketPlace')} &#160;{currEvent.ticketPlace}</label>

                        <label className="event-label">{t('userRemark')} &#160;{currEvent.userRemark}</label>
                    </fieldset>
                    {currEvent.user &&<fieldset className="event-details-fieldset" >
                        <legend>{t('contactInformation')}</legend>
                        {currEvent.user.firstName && <label className="event-label">{t('firstName')} &#160;{currEvent.user.firstName}</label>}
                        {currEvent.user.lastName && <label className="event-label">{t('lastName')} &#160;{currEvent.user.lastName}</label>}
                        {currEvent.user.mobile && <label className="event-label">{t('mobile')} &#160;{currEvent.user.mobile}</label>}
                        {currEvent.user.email && <label className="event-label">{t('email')} &#160;{currEvent.user.email}</label>}
                   
                        {currEvent.user.email && <div className="contact-user">
                            <a className='contact-seller' href={`https://mail.google.com/mail/?view=cm&source=mailto&to=${currEvent.user.email}`} target="_blank">{t('contactSeller')}</a>
                        </div>}
                    </fieldset>}

                    <button className="event-btn" onClick={() => onGoBack()}>{t('return')}</button>
                    {loggedInUser && <button className="event-btn" onClick={() => goToEdit()}>{t('update')}</button>}
                </div>
            </form>
        </section>
    )
}

export default EventDetails;