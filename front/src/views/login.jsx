import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, getLoggedinUser } from '../store/action/user.actions'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


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
            const data = new FormData(event.currentTarget);
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
            <div className="login-title">
                <h1>{t('login')}</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="login-input">
                    <label className="login-label"><span>{t('userName')}</span>
                        <input className="login-input" type="text" name="username" value={credentials.username} onChange={handleChange} required /></label>

                    <label className="login-label"><span>{t('password')}</span>
                    <input className="login-input" type="password" name="password" value={credentials.password} onChange={handleChange} required /></label>

                    <button className="login-btn">{t('login')}</button>
                </div>
            </form>
        </section>
    )
}

export default Login;