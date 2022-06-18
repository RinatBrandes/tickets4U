import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


export const EventPreview = ({ currEvent }) => {
    const navigate = useNavigate()



    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        navigate(`/event/${currEvent._id}`)
    }



    return (

        <li className="event-preview-container">
            <div className="info" onClick={onGoToDetails}>
                <div className="event-title">
                    <p >{currEvent.date} {currEvent.time}</p>
                    <p >{currEvent.eventName.substr(0, 70)}...</p>
                    <p>{currEvent.placeName}</p>
                    <p>{currEvent.eventPricePerCard}</p>
                </div>
            </div>
        </li >

    )
}
