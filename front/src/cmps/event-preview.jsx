import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { i18nService } from "../services/i18n-service";
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

const Icons = {
    'Music'    : Music,
    'Sport'    : Sport,
    'Theater'  : Theater,  
    'Cinema'   : Cinema,
    'Children' : Children,
    'Seniors'  : Seniors,
    'Fashion'  : Fashion,  
    'FoodTours': FoodTours,  
}
export const EventPreview = ({ event }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [dayWeek, setDayWeek] = useState(null)
    useEffect(() => {
console.log('event.date', event.date)
        // setDayWeek(event.date.getDay())
    }, [])


    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        console.log('event._id', event._id)
        navigate(`/event/${event._id}`)
    }

   
    // const onSetLang = (ev) => {
    //     let lang
    //     if(ev) {
    //         lang = ev.target.value
    //     } else {
    //         lang = 'he'
    //     }
        
    //     i18nService.setLang(lang)
    //     If lang is hebrew add RTL class to document.body
    //     if (lang === 'he') document.body.classList.add('rtl')
    //     else document.body.classList.remove('rtl')
    //     i18nService.doTrans()
    // }
 

    const pricePerCard = event.eventPricePerCard.toLocaleString('he-US', { style: 'currency', currency: 'ILS' })
    // const pricePerCard = currEvent.event.eventPricePerCard.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

    return (

        <li className="event-preview-container  note-modal">
            <div className="event-preview-info" onClick={onGoToDetails}>
                {/* <div className="event-type-name"> */}
                {/* </div> */}
                <div className="event-preview-card">
                    <div className="preview-first">

                        <p className="preview-txt">{event.eventName.substr(0, 15)}... </p><br></br>
                        <div className="preview-show-time">
                            <p className="preview-dayWeek">{event.date}</p>
                            <p className="preview-time">{event.time}</p>
                        </div>
                        {/* day in week */}
                        <div className="event-type-container">
                            <img src={Icons[event.eventType]} className="event-type-img"></img>
                        </div>
                        {/* <p>{event.eventType}</p> */}
                    </div>
                    <div className="preview-second">
                        <p className="event-preview-span">{event.eventCity}</p><br></br>
                        <p className="event-preview-span">{event.date}</p><br></br>
                    </div>
                    {/* <p className="event-preview-span">{event.date} &#160;</p> <p className="event-preview-txt" data-trans="eventDate">תאריך הארוע: </p><br></br> */}
                    <div className="preview-third">
                        <p className="event-preview-span">{pricePerCard}</p> <br></br>
                    </div>
                </div>
            </div>
        </li >

    )
}
