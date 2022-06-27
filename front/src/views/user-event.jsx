import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadEvents } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
import { i18nService } from "../services/i18n-service";
import {utilService} from '../services/util.service'

const UserEvent = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { events } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    var today
    useEffect(() => {
        onSetLang()
        
        const filterBy = {
            userId: loggedInUser._id,
            allDate: true
        }
        dispatch(loadEvents(filterBy))
        
        
    }, [])


    const GoToEdit = (ev, eventId) => {
        navigate(`/event/edit/${eventId}`)
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


    if (!events) return <h1>Loading</h1>
    today = Math.trunc(Date.now()/1000)   

    return (
        <section className="user-events-container">
            <div className="user-events-contant">
                <table className="events-table">
                    <thead>
                        <tr>

                            <th data-trans="eventName">Event name</th>
                            <th data-trans="eventDate">Event date</th>
                            <th data-trans="eventStatus">Event status</th>
                            <th data-trans="edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => <tr key={idx}>
                            <td>{event.eventName}</td>
                            <td>{event.date}</td>
                {/* {today > event.date && event.eventStatus === 'new' ? <p className="date-passed-msg" data-trans="date_passed_msg">The events that marked in red are events that their date passed - please close it!</p>: ''} */}
                            <td data-trans={event.eventStatus === "new" ? "new" : "close"}  >{event.status}</td>
                            {/* <td data-trans={ (today > utilService.toTimestamp(event.date)) ?  (event.eventStatus === "new" ? "needToClose" : "close"):(event.eventStatus=== "new" ? "new" : "close")}  className={today > utilService.toTimestamp(event.date)? "datePassed": "datefuture"} title={today > utilService.toTimestamp(event.date) && event.eventStatus === "new" ?'The event has passed please close it!':''}>{event.status}</td> */}
                            <td><button className="event-btn" data-trans="update" onClick={(ev) => GoToEdit(ev, event._id)}> Edit</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default UserEvent;