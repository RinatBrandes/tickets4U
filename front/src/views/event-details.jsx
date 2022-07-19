import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getById } from '../store/action/event.actions'
// import { i18nService } from '../services/i18n-service'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'


const EventDetails = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { currEvent } = useSelector((storeState) => storeState.eventModule)
    const [langDir, setLangDir] = useState(document.dir)
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
    let price
    if (langDir === "rtl") price = currEvent.eventPricePerCard.toLocaleString('he-IL', { style: 'currency', currency: 'ILS' })
    else price = currEvent.eventPricePerCard.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    return (
        <section className="main-container">
            <div className="main-left"></div>

            <div className="main-main">
                <div className="event-details-main">
                    <div className="event-title" >
                        <p className="event-details-title">{t('event-details')} </p>
                    </div>
                    <div className="event-details-container">
                        <form className="event-details-note-modal">
                            <div className="event-detailes-name-container">
                                <label className="event-name">{currEvent.eventName}</label>
                                <hr ></hr>
                            </div>

                            <div className="event-details-content">
                                <div className="event-details-right">
                                    {/* <legend className="event-details-legend">{t('where')}</legend> */}
                                    <div className="event-details-place">
                                        <label className="event-label">{currEvent.eventArea}&#160;-&#160;</label>
                                        <label className="event-label">{currEvent.eventCity}&#160;-&#160; </label>
                                        <label className="event-label">{currEvent.placeName}</label>
                                    </div>

                                    <div className="event-details-ticket">
                                        <label className="event-details-label">{currEvent.ticketCount}  {currEvent.ticketCount === 1 ? t('ticket') : t('tickets')} {t('in')} {price}  {t('each')}</label>
                                        {currEvent.ticketPlace && <label className="event-details-smaller-txt">{currEvent.ticketPlace}</label>}
                                    </div>

                                    <div className="event-details-date">
                                        <label className="event-label">{t(`${format(currEvent.date, 'EEEE')}`)} {currEvent.time} , {t(`${format(currEvent.date, 'dd')}`)} {t('in')}{langDir === "rtl" ? '' : '  '}{t(`${format(currEvent.date, 'MMMM')}`)}</label>
                                    </div>
                                    {currEvent.userRemark && <label className="event-details-smaller-txt bottom">{t('userRemark')} &#160;{currEvent.userRemark}</label>}                                    
                                </div>

                                <div className="event-details-left">
                                    {currEvent.user.firstName && <label className="event-label">{currEvent.user.firstName} {currEvent.user.lastName}</label>}
                                    {currEvent.user.mobile && <label className="event-label">{currEvent.user.mobile}</label>}
                                    {currEvent.user.email && <label className="event-label">{currEvent.user.email}</label>}

                                    {currEvent.user.email && <div className="contact-user">
                                        <a className="contact-seller" href={`https://mail.google.com/mail/?view=cm&source=mailto&to=${currEvent.user.email}`} target="_blank">{t('contactSeller')}</a>
                                    </div>}
                                </div>

                            </div>

                            <div className="event-details-btn">
                                <button className="event-btn" onClick={() => onGoBack()}>{t('return')}</button>
                                {loggedInUser && <button className="event-btn" onClick={() => goToEdit()}>{t('update')}</button>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div className="main-right"></div>
        </section>
    )
}

export default EventDetails;