import { useEffect, useState } from 'react'
import { EventPreview } from './event-preview.jsx'


export const EventList = ({ events }) => {
console.log('events', events)
    return (

        <div className="list-of-events-container">
            <ul className="event-list clean-list">
                {events.map(currEvent => <EventPreview key={currEvent._id} event={currEvent}/>)}
            </ul>
        </div>

    )
}
