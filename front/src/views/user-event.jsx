import * as React from 'react'
import { useEffect, useState } from 'react'
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
    const [langDir, setLangDir] = useState(document.dir)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    var today
    useEffect(() => {
        // onSetLang()
        setLangDir(document.dir)
        console.log('langDir',document.dir )
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

    return (
        <section className="main-container">
            <div className="main-left"></div>
            <div className="main-main">
            <div className="user-events-container">
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
                                <td className="right">{event.eventName}</td>
                                
                                <td>{(langDir === "rtl") ?  t(`${format(event.date,"dd-MM-yyyy")}`) :  t(`${format(event.date,"yyyy-MM-dd")}`) }</td>
                    {/* {today > event.date && event.eventStatus === 'new' ? <p className="date-passed-msg" data-trans="date_passed_msg">The events that marked in red are events that their date passed - please close it!</p>: ''} */}
                                <td  className="right">{event.eventStatus === "new" ? t("new") : t("close")}</td>
                                {/* <td data-trans={ (today > utilService.toTimestamp(event.date)) ?  (event.eventStatus === "new" ? "needToClose" : "close"):(event.eventStatus=== "new" ? "new" : "close")}  className={today > utilService.toTimestamp(event.date)? "datePassed": "datefuture"} title={today > utilService.toTimestamp(event.date) && event.eventStatus === "new" ?'The event has passed please close it!':''}>{event.status}</td> */}
                                <td><button className="event-btn" onClick={(ev) => GoToEdit(ev, event._id)}>{t('update')}</button></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                </div>       
        </div>
        <div className="main-right"></div>
    </section>
    )
}

export default UserEvent;