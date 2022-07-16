import { useEffect, useState } from 'react'
import { eventService } from '../services/event.service'
import { useTranslation } from 'react-i18next'
import Calendar from 'react-calendar'
import calendar from '../assets/img/calendar.svg'

export const EventFilter = ({ filterBy, handleChange, refreshEvent, clearSearch, value, setValue, onChange, setIsOpen, isOpen, openCalendar, onFocusChange }) => {
    const { t } = useTranslation()
    // const [value, setValue] = useState(new Date())
    // const [isOpen, setIsOpen] = useState(false)
    // const [lang,setLang] = useState('he')

    const [eventTypes, setEventTypes] = useState([''])



    useEffect(() => {
        const types = eventService.getEventTypes()
        setEventTypes(types)
    }, [])



    return (
        <section className="filter-container">
            <div className="filter-contant">
                <div className="filter-event-name">
                    <input className="search-filter" placeholder={t('eventName')} name="eventName" type="search" value={filterBy.eventName} onChange={handleChange} />
                    <input className="search-filter" placeholder={t('eventCity')} name="eventCity" type="search" value={filterBy.eventCity} onChange={handleChange} />
                    {/* <label className="iniline-block"><span  className="event-label">{t('eventArea')}</span>&#160;</label> */}
                    <select onChange={handleChange} className="search-filter iniline-block" value={filterBy.eventArea} name="eventArea">
                        <option value="">{t('Select')}</option>
                        <option value="south">{t('south')}</option>
                        <option value="haifa">{t('haifa')}</option>
                        <option value="jerusalem">{t('jerusalem')}</option>
                        <option value="center-and-humiliation">{t('center_humiliation')}</option>
                        <option value="north">{t('north')}</option>
                        <option value="sharon">{t('sharon')}</option>
                    </select>
                    <input className="search-filter" placeholder={t('eventTicketQty')} name="eventTicketQty" type="number" value={filterBy.eventTicketQty} onChange={handleChange} />
                    <input className="search-filter" placeholder={t('eventPricePerCard')} name="eventPricePerCard" type="number" step=".01" value={filterBy.eventPricePerCard} onChange={handleChange} />
                    <img className="filter-calendar iniline-block" src={calendar} onClick={openCalendar} alt="calendar"></img>
                    <button className="filter-btn" onClick={clearSearch} >{t('clearSearch')} </button>
                </div>

                <div className="filter-event-date">
                    {isOpen && <Calendar onChange={onChange} name="fromDate" value={value} calendarType="Hebrew" className="react-calendar" selectRange={true} onFocusChange={onFocusChange} />}
                    {/* {value.length > 0 ? (<p className='text-center'><span className='bold'>Start:</span>{' '}
                    {value[0].toDateString()}&nbsp;|&nbsp;<span className='bold'>End:</span> {value[1].toDateString()}</p>) : (
                    <p className='text-center'><span className='bold'>Default selected date:</span>{' '}{value.toDateString()}</p>)}                     */}
                </div>
                {/* <label><span  className="event-label" >{t('eventType')}</span>&#160;
                <select onChange={handleChange} className="event-input" value={filterBy.eventType} name="eventType" >
                    {eventTypes.map(type =>
                        <option value={type === 'Select' ? '' : type}  key={type}>{t(`${type}`)}</option>
                        // <option value={type === 'Select' ? '' : type} data-trans={type} key={type}>{type}</option>
                    )}
                </select></label> */}

                {/* <div className="filter-event-date">
                    <label><span className="filter-label">{t('fromDate')}</span>&#160;
                        <input className="search-filter" name="fromDate" type="date" placeholder="Search..." value={filterBy.fromDate} onChange={handleChange} /></label>

                    <label><span  className="filter-label">{t('toDate')}</span>&#160;
                        <input className="search-filter" name="toDate" type="date" placeholder="Search..." value={filterBy.toDate} onChange={handleChange} /></label>

                </div> */}


                {/* <button className="filter-btn" onClick={refreshEvent}>{t('search')}</button> */}
            </div>
        </section>
    )
}

