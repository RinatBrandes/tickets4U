import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, getLoggedinUser } from '../store/action/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    useEffect(() => {

    }, [])


    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setCredentials({ credentials: { ...credentials, name: value } });
    }

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const loginInfo = {
                userName: data.get('username'),
                password: data.get('password'),
            }
            // doLogin(loginInfo)
            dispatch(login(loginInfo))
            dispatch(getLoggedinUser())
            navigate('/')
        } catch (err) {
            showErrorMsg(err)
            console.log('Error:', err)
        }
    }

    
    // const  doLogin = async (loginInfo) => {
    //     try{
    //         await login(loginInfo)
    //         await getLoggedinUser()
    //     } catch (err) {
    //         console.log('Err:',err )
    //     }
    // }

    return (
        <section className="login-container">
            <div className="login-title">
                <h1 data-trans="login">כניסה</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="login-input">
                    <label className="login-label" data-trans="userName"> שם משתמש</label>
                    <input className="login-input" type="text" name="username" value={credentials.username} onChange={(ev) => handleChange(ev)} required />

                    <label className="login-label" data-trans="password"> סיסמה</label>
                    <input className="login-input" type="password" name="password" value={credentials.password} onChange={(ev) => handleChange(ev)} required />

                    <button className="login-btn" data-trans="login">התחבר</button>
                </div>
            </form>
        </section>
    )
}

export default Login;