import { useCallback, useEffect, useRef } from "react";
import { useState } from 'react'
import { loadEvents } from "../store/action/event.actions";
import { useSelector, useDispatch } from 'react-redux'
import { EventList } from "../cmps/event-list";
import { socketService } from "../services/socket.service.js";
import { EventFilter } from "../cmps/event-filter";
import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service";
import { EventType } from "../cmps/event-type";
import _ from 'lodash'



const TicketApp = () => {

    const initialFilter = { fromDate: '', toDate: '', eventName: '', eventType: '', eventCity: '', eventArea: '', eventTicketQty: '', eventPricePerCard: '' }
    const dispatch = useDispatch()
    const { events } = useSelector((storeState) => storeState.eventModule)
    const [filterBy, setfilterBy] = useState(initialFilter)
    const [value, setValue] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false)
    const test = useRef()

    // setfilterBy = utilService.debounce(setfilterBy,2500)

    useEffect(() => {
        socketService.emit('chat topic', 'eventUser')
        socketService.on('eventSaved', refreshEvent)
        const filterBy = {
            allDate: false
        }
        dispatch(loadEvents(filterBy))
        

        return () => {
            socketService.off('eventSaved', refreshEvent)
        }
    }, [])


    useEffect(() => {
        const a = debounceHandelChange(filterBy)
        // refreshEvent()
    }, [filterBy])


    const refreshEvent = (filterBy) => {

        dispatch(loadEvents(filterBy))
    }

    //using lodash
    const debounceHandelChange = useCallback(utilService.debounce(refreshEvent, 1000), [])
    

    const onChange = (ev) => {

        console.log('ev', ev[0])
        console.log('ev', ev[1])
        setValue(ev[0])
        //date to timestamp - fromDate
        let fromDate = Math.round(ev[0].getTime() / 1000)
        filterBy.fromDate = +fromDate
        setfilterBy({ ...filterBy, 'fromDate': fromDate })

        //toDate
        let toDate = Math.round(ev[1].getTime() / 1000)
        filterBy.toDate = +toDate
        setfilterBy({ ...filterBy, toDate: toDate })
        onFocusChange()

      
    }

    const handleChange = (event) => {
        console.log('event', event.target)
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


    const clearSearch = () => {
        setfilterBy(initialFilter)
    }

    const showEventByType = (ev, type) => {
        setfilterBy({ ...filterBy, eventType: type })
        dispatch(loadEvents(filterBy))
    }

    const openCalendar = () => {
        setIsOpen(true)
    }

    const onFocusChange = () => {

        setIsOpen(false)
    }

    return (
        <section className="main-container">
             <div className="main-left"></div>
            <div className="main-main">
                <EventType showEventByType={showEventByType} />
                <EventFilter filterBy={filterBy} handleChange={handleChange} refreshEvent={refreshEvent} clearSearch={clearSearch} onChange={onChange} setValue={setValue} value={value} setIsOpen={setIsOpen} isOpen={isOpen} openCalendar={openCalendar} onFocusChange={onFocusChange} />
                <EventList events={events} />
            </div>
            <div className="main-right"></div>
        </section>
    )
}

export default TicketApp;