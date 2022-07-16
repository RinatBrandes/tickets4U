import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
// import { i18nService } from "../services/i18n-service"
import { useTranslation } from 'react-i18next'
import food_event from '../assets/img/food_event.svg'
import Children from '../assets/img/Children.svg'
import Cinema from '../assets/img/Cinema.svg'
import Fashion from '../assets/img/Fashion.svg'
import FoodTours from '../assets/img/FoodTours.svg'
import Music from '../assets/img/Music.svg'
import Seniors from '../assets/img/Seniors.svg'
import Sport from '../assets/img/Sport.svg'
import Theater from '../assets/img/Theater.svg'
import Other from '../assets/img/Other.svg'
import format from 'date-fns/format'

const Icons = {
    'Music': Music,
    'Sport': Sport,
    'Theater': Theater,
    'Cinema': Cinema,
    'Children': Children,
    'Seniors': Seniors,
    'Fashion': Fashion,
    'FoodTours': FoodTours,
    'Other': Other
}
export const EventPreview = ({ event }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        // console.log('event.date', event.date)

    }, [])


    const onGoToDetails = (ev) => {
        ev.stopPropagation()

        navigate(`/event/${event._id}`)
    }


    const pricePerCard = event.eventPricePerCard.toLocaleString('he-US', { style: 'currency', currency: 'ILS' })
    // const pricePerCard = currEvent.event.eventPricePerCard.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

    return (

        <li className="event-preview-container  note-modal">
            {/* <div className="event-preview-info" onClick={onGoToDetails}> */}
            {/* <div className="event-type-name"> */}
            {/* </div> */}
            <div className="event-preview-card" onClick={onGoToDetails}>
                <div className="preview-first">

                    <div className="event-type-container">
                        <img src={Icons[event.eventType]} className="event-type-img"></img>
                    </div>
                    <p className="preview-txt">{event.eventName.substr(0, 12)}... </p>
                    <p className="event-preview-span">{event.eventCity}</p>
                    <p className="event-preview-span">{pricePerCard}</p>

                </div>
                <div className="preview-second">
                    {/* day in week */}

                    <div className="preview-show-time">
                        <p className="preview-dayWeek">{t(`${format(event.date, 'EEEE')}`)}</p>
                        <p className="preview-time">{event.time}</p>
                    </div>
                    {/* <p>{event.eventType}</p> */}
                </div>
                {/* <p className="event-preview-span">{event.date} &#160;</p> <p className="event-preview-txt" data-trans="eventDate">תאריך הארוע: </p><br></br> */}
                <div className="preview-third">
                    <p className="event-preview-month">{t(`${format(event.date, 'dd')}`)}</p>
                    <p className="event-preview-month">{t(`${format(event.date, 'MMMM')}`)}</p>
                </div>
            </div>
            {/* </div> */}
        </li >

    )
}
