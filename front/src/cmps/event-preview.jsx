import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { i18nService } from "../services/i18n-service";

export const EventPreview = ({ event }) => {
    const navigate = useNavigate()

    
    useEffect(() => {

        onSetLang()

    }, [])


    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        navigate(`/event/${event._id}`)
    }

   
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
 

    const pricePerCard = event.eventPricePerCard.toLocaleString('he-US', { style: 'currency', currency: 'ILS' })
    // const pricePerCard = currEvent.event.eventPricePerCard.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

    return (

        <li className="event-preview-container  note-modal">
            <div className="event-preview-info" onClick={onGoToDetails}>
                <div className="event-type-name">
                    <p>{event.eventType}</p>
                </div>
                <div className="event-preview-card">
                    <p className="event-preview-span"><span className="event-preview-txt" data-trans="eventDate">Event date</span> &#160;{event.date}</p><br></br>
                    {/* <p className="event-preview-span">{event.date} &#160;</p> <p className="event-preview-txt" data-trans="eventDate">תאריך הארוע: </p><br></br> */}
                    <p className="event-preview-span"><span className="event-preview-txt" data-trans="eventTime">Event hour</span> &#160;{event.time}</p><br></br>
                    <p className="event-preview-span"><span className="event-preview-txt" data-trans="eventName">Event Name</span> &#160;{event.eventName.substr(0, 15)}... </p><br></br>
                    <p className="event-preview-span"><span className="event-preview-txt" data-trans="placeName">Place name</span> &#160;{event.placeName.substr(0, 12)}...</p><br></br>
                    <p className="event-preview-span"><span className="event-preview-txt" data-trans="eventPricePerCard">Price per tiket</span> &#160;{pricePerCard}</p> <br></br>
                </div>
            </div>
        </li >

    )
}
