import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadEvents } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'

const UserEvent = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { events } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {
        const filterBy = {
            userId: loggedInUser._id
        }
        dispatch(loadEvents(filterBy))

    }, [])


    const GoToEdit = (ev, eventId) => {
        navigate(`/event/edit/${eventId}`)
    }

    if (!events) return <h1>Loading</h1>
    return (
        <section className="user-events-container">
            <div className="user-events-contant">
                <table className="events-table">
                    <thead>
                        <tr>

                            <th>שם הארוע</th>
                            <th>תאריך הארוע</th>
                            <th>סטטוס</th>
                            <th>עדכון</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => <tr key={idx}>
                            <td>{event.eventName}</td>
                            <td>{event.date}</td>
                            <td>{event.status === "new" ? 'סגור' : 'חדש'}</td>
                            <td><button className="event-btn" data-trans="update" onClick={(ev) => GoToEdit(ev, event._id)}> עדכון ארוע</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default UserEvent;