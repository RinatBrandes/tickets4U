import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadEvents } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
// import { i18nService } from "../services/i18n-service";
import {utilService} from '../services/util.service'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'

const UserEvent = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { events } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    var today
    useEffect(() => {
        // onSetLang()
        
        const filterBy = {
            userId: loggedInUser._id,
            allDate: true
        }
        dispatch(loadEvents(filterBy))
        
        
    }, [])


    const GoToEdit = (ev, eventId) => {
        navigate(`/event/edit/${eventId}`)
    }

    

    if (!events) return <h1>Loading</h1>
    today = Math.trunc(Date.now()/1000)   
console.log('', events)
    return (
        <section className="user-events-container">
            <div className="user-events-contant">
                <table className="events-table">
                    <thead>
                        <tr>

                            <th>{t('eventName')}</th>
                            <th>{t('eventDate')}</th>
                            <th>{t('eventStatus')}</th>
                            <th>{t('edit')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => <tr key={idx}>
                            <td>{event.eventName}</td>
                            <td>{t(`${format(event.date,"yyyy-MM-dd")}`)}</td>
                {/* {today > event.date && event.eventStatus === 'new' ? <p className="date-passed-msg" data-trans="date_passed_msg">The events that marked in red are events that their date passed - please close it!</p>: ''} */}
                            <td>{event.eventStatus === "new" ? t("new") : t("close")}</td>
                            {/* <td data-trans={ (today > utilService.toTimestamp(event.date)) ?  (event.eventStatus === "new" ? "needToClose" : "close"):(event.eventStatus=== "new" ? "new" : "close")}  className={today > utilService.toTimestamp(event.date)? "datePassed": "datefuture"} title={today > utilService.toTimestamp(event.date) && event.eventStatus === "new" ?'The event has passed please close it!':''}>{event.status}</td> */}
                            <td><button className="event-btn" onClick={(ev) => GoToEdit(ev, event._id)}>{t('update')}</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default UserEvent;