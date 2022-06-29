import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService  } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

//https://www.youtube.com/watch?v=NMB2vjDLTLk
//https://www.youtube.com/watch?v=AsYTD_TugD4
const ForgottenPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: ''})
    const { t } = useTranslation()


    const handleChange = (event) => {
        const { value } = event.target
        const { name } = event.target
        // console.log('value', value)
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const userInfo = {
                email: data.get('email')                
            }
console.log('userInfo',userInfo )
            userService.sendResetEmail(userInfo)
            // dispatch(getLoggedinUser())
            navigate(-1)
        } catch (err) {
            showErrorMsg(err)
            console.log('Error:', err)
        }
    }


    return (
        <section className="forgot-pass-container">
            <div className="forgot-pass-title">
                <h1>{t('forgot-pass-title')}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="forgot-pass-input">
                    <label className="forgot-pass-label"><span>{t('inserMail')}</span>
                        <input className="forgot-pass-input" type="email" name="email" value={credentials.email} onChange={handleChange} required /></label>

                    <button className="forgot-pass-btn">{t('send')}</button>
                  
                </div>
            </form>
        </section>
    )
}

export default ForgottenPassword;