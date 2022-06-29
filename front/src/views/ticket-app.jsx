import { useEffect } from "react";
import { useState } from 'react'
import { loadEvents } from "../store/action/event.actions";
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";
import { socketService } from "../services/socket.service.js";
import { EventFilter } from "../cmps/event-filter";
import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service";
import { i18nService } from "../services/i18n-service";
import { EventType } from "../cmps/event-type";
import { useTranslation } from 'react-i18next'
import _ from 'lodash' 



const TicketApp = () => {
    const { t } = useTranslation()
    const initialFilter = { fromDate: '', toDate: '', eventName: '', eventType: '', eventCity: '', eventArea: '', eventTicketQty: '', eventPricePerCard: '' }

    const dispatch = useDispatch()
    const { events } = useSelector((storeState) => storeState.eventModule)
    const [filterBy, setfilterBy] = useState(initialFilter)
    const [value, setValue] = useState(new Date());
    
    // setfilterBy = utilService.debounce(setfilterBy,2500)

    useEffect(() => {
        socketService.emit('chat topic', 'eventUser')
        socketService.on('eventSaved', refreshEvent)
        const filterBy = {            
            allDate: false
        }
        dispatch(loadEvents(filterBy))
        // onSetLang()

        return () => {
            socketService.off('eventSaved', refreshEvent)
        }
    }, [])


    useEffect(() => {
        refreshEvent()
    }, [filterBy])

    const refreshEvent = () => {
        dispatch(loadEvents(filterBy))
    }

    
    // const onSetLang = (ev) => {
    //     let lang
    //     if(ev) {
    //         lang = ev.target.value
    //     } else {
    //         lang = 'he'
    //     }
        
    //     i18nService.setLang(lang)
    //     // If lang is hebrew add RTL class to document.body
    //     // if (lang === 'he') document.body.classList.add('rtl')
    //     // else document.body.classList.remove('rtl')
    //     i18nService.doTrans()
    // }

    
    const onChange = (ev) => {        
        
        console.log('ev', ev[0])
        console.log('ev', ev[1])
        setValue(ev[0])
        //date to timestamp
        let fromDate = Math.round(ev[0].getTime() / 1000)
        console.log('fromDate', fromDate)
        filterBy.fromDate = +fromDate
        setfilterBy({ ...filterBy, 'fromDate': fromDate })
        console.log('filterBy', filterBy)
        

        let toDate = Math.round(ev[1].getTime() / 1000)
        console.log('toDate', toDate)
        filterBy.toDate = +toDate
        setfilterBy({ ...filterBy, toDate: toDate })
        console.log('filterBy', filterBy)
        // filterBy.fromDate = date
        
        //timestamp to date
        //date = Date(date * 1000);
        //console.log('date', date)
    }

    const  handleChange = (event) => {
        console.log('event.target',event.target )
        let value = event.target.value
        const name = event.target.name
        if (name === 'fromDate' || name === 'toDate') {
            const fromDate = utilService.toTimestamp(name === 'fromDate' ? value : filterBy.fromDate)
            const toDate = utilService.toTimestamp(name === 'toDate' ? value : filterBy.toDate)
            
            if (fromDate && toDate && (toDate < fromDate)) {
                return showErrorMsg(`{t('dateToCantBeSmaller')}`) 
                
            }
        }        
        setfilterBy({ ...filterBy, [name]: value })
    }
    // const debounceHandelChange = _.debounce(handleChange,1000)
    
    // const debounce = _.debounce((handleChange) => handleChange(handleChange),1000)
    // const debouncedHandleChange = utilService.debounce((event) => {
    //     console.log('ev', event);
    //     let value = event.target.value
    //     const name = event.target.name
    //     if (name === 'fromDate' || name === 'toDate') {
    //         const fromDate = utilService.toTimestamp(name === 'fromDate' ? value : filterBy.fromDate)
    //         const toDate = utilService.toTimestamp(name === 'toDate' ? value : filterBy.toDate)

    //         if (fromDate && toDate && (toDate < fromDate)) {
    //             return showErrorMsg('תאריך סיום לא יכול להיות גדול מתאריך התחלה')
    //         }
    //     }
    //     console.dir(event.target);
    //     setfilterBy({ ...filterBy, [name]: value })
    // }, 2000)


    const clearSearch = () => {
        setfilterBy(initialFilter)
    }

    const showEventByType = (ev,type) => {
        
        const filterBy = {
            eventType: type
        }

        dispatch(loadEvents(filterBy))
    }


    return (
        <section className="ticket-app">
            <EventType showEventByType={showEventByType}/>
            <EventFilter filterBy={filterBy} handleChange={handleChange} refreshEvent={refreshEvent} clearSearch={clearSearch} onChange={onChange} setValue={setValue} value={value}/>
            <EventList events={events} />
        </section>
    )
}

export default TicketApp;