import * as React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, getLoggedinUser } from '../store/action/user.actions'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ForgottenPassword from './forgotten-password'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const { t } = useTranslation()

    const handleChange = (event) => {
        const { value } = event.target
        const { name } = event.target
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget)
            const loginInfo = {
                userName: data.get('username'),
                password: data.get('password'),
            }
            dispatch(login(loginInfo))
            dispatch(getLoggedinUser())
            navigate('/')
        } catch (err) {
            showErrorMsg(err)
            console.log('Error:', err)
        }
    }


    return (
        <section className="login-container">
            <div className="login-wrapper">
                <div className="login-title">
                    <h1>{t('login')}</h1>
                </div>
                <form className="login-form" onSubmit={handleSubmit} >                    

                        <label className="login-label"><span>{t('userName')}</span>
                            <input className="login-input" type="text" name="username" value={credentials.username} onChange={handleChange} required /></label>

                        <label className="login-label"><span>{t('password')}</span>
                            <input className="login-input" type="password" name="password" value={credentials.password} onChange={handleChange} autoComplete="off" required /></label>

                        <button className="login-btn">{t('login')}</button>

                        <div className='forgot-password'>
                            <Link className="forgot-pass" to='/forgotpass'>{t('forgotPass')}</Link>
                            {/* <p className='forgot-pass-txt'>{t('forgotPass')}<span> <Link  className="forgot-pass" to='/forgotpass'>{t('resetIt')}</Link></span></p> */}
                        </div>
                </form>
            </div>
        </section>
    )
}

export default Login;