import { useNavigate } from "react-router-dom";


export const EventPreview = (currEvent) => {
    const navigate = useNavigate()



    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        console.log('currEvent', currEvent)
        navigate(`/event/${currEvent.event._id}`)
    }



    const pricePerCard = currEvent.event.eventPricePerCard.toLocaleString('he-US', { style: 'currency', currency: 'ILS' })
    // const pricePerCard = currEvent.event.eventPricePerCard.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    return (

        <li className="event-preview-container  note-modal">
            <div className="event-preview-info" onClick={onGoToDetails}>
                <div className="event-preview-card">
                    <p className="event-preview-span">{currEvent.event.date} &#160;</p> <p className="event-preview-txt" data-trans="eventDate">תאריך הארוע: </p><br></br>
                    <p className="event-preview-span">{currEvent.event.time} &#160;</p> <p className="event-preview-txt" data-trans="eventTime"> שעת הארוע:</p><br></br>
                    <p className="event-preview-span">...{currEvent.event.eventName.substr(0, 15)} &#160;</p> <p className="event-preview-txt" data-trans="eventName">שם הארוע:</p><br></br>
                    <p className="event-preview-span">{currEvent.event.placeName} &#160;</p> <p className="event-preview-txt" data-trans="placeName">מקום הארוע:</p><br></br>
                    <p className="event-preview-span">{pricePerCard} &#160;</p> <p className="event-preview-txt" data-trans="eventPricePerCard">מחיר לכרטיס:</p><br></br>
                </div>
            </div>
        </li >

                    )
}
