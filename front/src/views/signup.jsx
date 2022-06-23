import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signup, getLoggedinUser } from '../store/action/user.actions'
import { useNavigate } from 'react-router-dom'
import { showErrorMsg } from '../services/event-bus.service.js'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
        approvedEmail: false,
        approvedMobile: false
    })


    useEffect(() => {

    }, [])


    const handleChange = (event) => {
        let value = event.target.value;
        const name = event.target.name;

        if (name === 'approvedMobile' || name === 'approvedEmail') {
            value = event.target.checked
        }
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const signupInfo = {
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                userName: data.get('username'),
                password: data.get('password'),
                mobile: data.get('mobile'),
                email: data.get('email'),
                approvedEmail: data.get('approvedEmail'),
                approvedMobile: data.get('approvedMobile'),
            }
            //to change the string to boolean
            signupInfo.approvedEmail = (signupInfo.approvedEmail === 'true')
            signupInfo.approvedMobile = (signupInfo.approvedMobile === 'false')


            if (signupInfo.approvedMobile === false && signupInfo.approvedEmail === false) {
                showErrorMsg('The user didn\'t select mobile or mail ')
                console.log('the user didn\'t select mobile or mail')
                return
            } 

            dispatch(signup(signupInfo))
            dispatch(getLoggedinUser())
            navigate('/')
        } catch (err) {
            showErrorMsg(err)
            console.log('Error:', err)
        }
    }


    return (
        <section className="signup-container">
            <div className="signup-title">
                <h1 data-trans="signup">Signup</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="signup-input">
                    <div className="signup-small-container">
                        <label className="signup-label"><span data-trans="firstName">First name </span>
                        <input className="signup-input" type="text" name="firstName" value={user.firstName} onChange={(ev) => handleChange(ev)} required /></label>


                        <label className="signup-label"><span data-trans="lastName">Last name</span>
                        <input className="signup-input" type="text" name="lastName" value={user.filasttName} onChange={(ev) => handleChange(ev)} required /></label>
                    </div>

                    <div className="signup-small-container">
                        <label className="signup-label"><span data-trans="password">Password</span>
                        <input className="signup-input" type="password" name="password" value={user.password} onChange={(ev) => handleChange(ev)} required /></label>

                        <label className="signup-label"><span data-trans="userName">User name </span>
                        <input className="signup-input" type="text" name="username" value={user.username} onChange={(ev) => handleChange(ev)} required /></label>
                    </div>

                    <div className="signup-small-container">
                        <label className="signup-label"><span  data-trans="email">Email</span>
                        <input className="signup-input" type="email" name="email" value={user.email} onChange={(ev) => handleChange(ev)} /></label>

                        <label className="signup-label"><span  data-trans="mobile">Mobile</span>
                        <input className="signup-input" type="phone" name="mobile" value={user.mobile} onChange={(ev) => handleChange(ev)} /> </label>
                    </div>

                    <div className="signup-small-container">
                        <label className="signup-label signup-checkbox-label"><span  data-trans="approvedMobile">Approved sending message</span>
                        <input className="signup-input signup-checkbox-input" type="checkbox" name="approvedMobile" value={user.approvedMobile} onChange={(ev) => handleChange(ev)} /></label>

                        <label className="signup-label signup-checkbox-label"><span data-trans="approvedEmail">Approved sending email</span>
                        <input className="signup-input signup-checkbox-input" type="checkbox" name="approvedEmail" value={user.approvedEmail} onChange={(ev) => handleChange(ev)} /></label>
                    </div>


                    <button className="signup-btn" data-trans="signup">Signup</button>
                </div>
            </form>
        </section>
    )
}

export default Signup;