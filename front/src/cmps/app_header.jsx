import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import i18next from "i18next"
import { useTranslation } from 'react-i18next'
import { UserMsg } from "./user-msg"
import { ProfileMenu } from '../cmps/profile-menu.jsx'
import { logout } from '../store/action/user.actions'
import avatar from '../assets/img/avatar.jpeg'
import logo from '../assets/img/logo.svg'


const AppHeader = () => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profileMenu, setMenu] = useState(false)
    const [lang, setLang] = useState('he')
    const { t } = useTranslation()

    const handelLangChange = (ev) => {
        const selectedLang = ev.target.value
        i18next.changeLanguage(selectedLang)
        setLang(selectedLang)
        if (selectedLang === 'he') document.dir = 'rtl'
        else document.dir = 'ltr'
    }

    const onOpenLoginPage = () => {
        navigate('/login')
    }

    const onOpenSignupPage = () => {
        navigate('/signup')
    }

    const onLogout = () => {
        dispatch(logout())
        var flag = !profileMenu
        setMenu(flag)
    }

    const onToggleMenu = () => {
        var flag = !profileMenu
        setMenu(flag)
    }

    const onGoBack = () => {
        navigate('/')
    }


    return (

        <section className="header-container">
            <div className="header-left-side"></div>

            <div className="header-main">
                <div className="header-contant-container">
                    <div className="header-options">
                        <img className="header-logo" src={logo} alt="logo" onClick={onGoBack}></img>

                        <select onChange={handelLangChange} className="lang-option" value={lang}>
                            <option value="he">{t('langHe')}</option>
                            <option value="en">{t('langEn')}</option>
                        </select>

                        <div className="header-nav-bar">

                            <div className="login-signup">
                                {!loggedInUser && <button className="header-btn" onClick={onOpenSignupPage}>{t('signup')}</button>}
                                {!loggedInUser && <button className="header-btn" onClick={onOpenLoginPage}>{t('login')}</button>}
                            </div>

                            <div className="avatar-container">
                                {loggedInUser && <img className="avatar-img" src={avatar} onClick={onToggleMenu} alt="Avatar"></img>}
                            </div>
                            <div className="profile-container">
                                {profileMenu && <ProfileMenu onLogout={onLogout} user={loggedInUser} closeMenu={onToggleMenu} />}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="header-right-side"></div>
            <UserMsg />
        </section>
    )
}

export default AppHeader;

