
import { EventPreview } from './event-preview.jsx'


export const EventList = ({ events }) => {

    return (

        <div className="list-of-events-container">
            <ul className="event-list clean-list">
                {events.map(event => <EventPreview key={event._id} event={event}/>)}
            </ul>
        </div>

    )
}
