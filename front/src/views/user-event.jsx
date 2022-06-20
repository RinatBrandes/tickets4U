import * as React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadEvents } from '../store/action/event.actions'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service';

const UserEvent = () => {
    const { loggedInUser} = useSelector((storeState) => storeState.userModule)
    const { events } = useSelector((storeState) => storeState.eventModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
   

    
    useEffect(() => {
        const filterBy =  {
            userId: loggedInUser._id
        }
        dispatch(loadEvents(filterBy))
       
    }, [])


    // const handleChange = (event) => {
    //     let value = event.target.value;
    //     const name = event.target.name;              
    //     setCurrEvent({ currEvent: { ...currEvent, name: value } });
    // }

   

    const GoToEdit = (ev,eventId) => {
        
        navigate(`/event/edit/${eventId}`)
    }

    // const onGoBack = () => {
    //     navigate('/')
    // }




    if (!events) return <h1>Loading</h1>
    // console.log('events',events)
    // console.log('loggedInUser', loggedInUser )
    // let date = utilService.toDate(event.date)
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
                        <td>{event.status === "new"? 'סגור' :'חדש' }</td>
                        <td><button className="event-btn" data-trans="update" onClick={(ev) => GoToEdit(ev,event._id)}> עדכון ארוע</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
         
        </section>
    )
}

export default UserEvent;