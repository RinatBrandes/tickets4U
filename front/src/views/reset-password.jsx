import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [credentials, setCredentials] = useState({ token: '', password: '', passwordConfirm: '' })
    const { t } = useTranslation()


    useEffect = () => {
        console.log('email', params)
    }

    const handleChange = (event) => {
        const { value } = event.target
        const { name } = event.target
        // console.log('value', value)
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const userInfo = {
                token: params.email,
                password: data.get('password'),
                passwordConfirm: data.get('passwordConfirm')
            }
            console.log('userInfo', userInfo)

            // userService.resetPassword(userInfo)
            // dispatch(getLoggedinUser())
            navigate('login')
        } catch (err) {
            showErrorMsg(err)
            console.log('Error:', err)
        }
    }


    return (
        <section className="reset-pass-container">
            <div className="reset-pass-title">
                <h1>{t('reset-pass-title')}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="reset-pass-input">
                    <label className="reset-pass-label"><span>{t('inserPass')}</span>
                        <input className="reset-pass-input" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Passwod" required /></label>

                    <label className="reset-pass-label"><span>{t('inserPassConfirm')}</span>
                        <input className="reset-pass-input" type="password" name="passwordConfirm" value={credentials.passwordConfirm} onChange={handleChange} placeholder="Password confirm" required /></label>

                    <button className="reset-pass-btn">{t('send')}</button>

                </div>
            </form>
        </section>
    )
}

export default ResetPassword;