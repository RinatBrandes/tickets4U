import { useNavigate } from "react-router-dom";

export const EventPreview = ({ event }) => {
    const navigate = useNavigate()

    const onGoToDetails = (ev) => {
        ev.stopPropagation()
        navigate(`/event/${event._id}`)
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
                    <p className="event-preview-span"> <span className="event-preview-txt" data-trans="eventDate">Event date</span> {event.date} &#160;</p><br></br>
                    {/* <p className="event-preview-span">{event.date} &#160;</p> <p className="event-preview-txt" data-trans="eventDate">תאריך הארוע: </p><br></br> */}
                    <p className="event-preview-span">{event.time} &#160;</p> <p className="event-preview-txt" data-trans="eventTime">Event hour</p><br></br>
                    <p className="event-preview-span">...{event.eventName.substr(0, 15)} &#160;</p> <p className="event-preview-txt" data-trans="eventName">Event Name</p><br></br>
                    <p className="event-preview-span">...{event.placeName.substr(0, 12)} &#160;</p> <p className="event-preview-txt" data-trans="placeName">Place name</p><br></br>
                    <p className="event-preview-span">{pricePerCard} &#160;</p> <p className="event-preview-txt" data-trans="eventPricePerCard">Price per tiket</p><br></br>
                </div>
            </div>
        </li >

    )
}
