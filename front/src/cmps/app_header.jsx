import { useEffect, useState } from "react";
import { i18nService } from "../services/i18n-service"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UserMsg } from "./user-msg";
import { ProfileMenu } from '../cmps/profile-menu.jsx'
import { logout } from '../store/action/user.actions'
import avatar from '../assets/img/avatar.jpeg'
import logo_big_bg from '../assets/img/logo_big_bg.jpg'



const AppHeader = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profileMenu, setMenu] = useState(false)


    useEffect(() => {
        onSetLang()

    }, [])

    const onSetLang = (ev) => {
        let lang
        if(ev) {
            lang = ev.target.value
        } else {
            lang = 'he'
        }
        
        i18nService.setLang(lang)
        // If lang is hebrew add RTL class to document.body
        if (lang === 'he') document.body.classList.add('rtl')
        else document.body.classList.remove('rtl')

        i18nService.doTrans()
    }


    const onOpenLoginPage = () => {
        navigate('/login')
    }

    const onOpenSignupPage = () => {
        navigate('/signup')
    }

    const onLogout = () => {
        dispatch(logout())
        var flag = !profileMenu;
        setMenu(flag);
    }

    const onToggleMenu = () => {
        var flag = !profileMenu;
        setMenu(flag);
    }

    const onGoBack = () => {
        navigate('/')
    }


    return (
        <section className="header-container full">
            <div className="main-layout">
                <div className="header-logo-container">
                    <div className="header-options">
                        <select onChange={onSetLang} className="lang-option">
                            <option value="he" data-trans="langHe">עברית</option>
                            <option value="en" data-trans="langEn">English</option>
                        </select>
                        <div className="header-nav-bar">

                            {!loggedInUser && <button onClick={onOpenSignupPage} data-trans="signup">התחברות</button>}
                            {!loggedInUser && <button onClick={onOpenLoginPage} data-trans="login">כניסה</button>}

                            <div className="avatar-container">
                                {loggedInUser && <img className="avatar-img" src={avatar} onClick={onToggleMenu} alt="Avatar"></img>}
                            </div>
                            <div className="profile-container">
                                {profileMenu && <ProfileMenu onLogout={onLogout} user={loggedInUser} closeMenu={onToggleMenu} />}
                            </div>
                        </div>
                    </div>
                    <img className="header-logo" src={logo_big_bg} alt="logo" onClick={onGoBack}></img>
                </div>

            </div>
            <UserMsg />
        </section>
    )
}

export default AppHeader;

