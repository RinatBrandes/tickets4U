import { useEffect,useState } from "react";
import logo_big_bg from '../assets/img/logo_big_bg.jpg'
import { i18nService } from "../services/i18n-service"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UserMsg } from "./user-msg";
import avatar from '../assets/img/avatar.jpeg'
import { ProfileMenu } from '../cmps/profile-menu.jsx'
import { logout } from '../store/action/user.actions'

// import { getLoggedinUser } from '../store/action/user.actions'

const AppHeader = () => {
    const { loggedInUser} = useSelector((storeState) => storeState.userModule)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profileMenu, setMenu] = useState(false)

    let user
    useEffect(() => {
        // dispatch(getLoggedinUser())
      

    }, [])

    const onSetLang = ({ target }) => {
        const lang = target.value
        i18nService.setLang(lang)
        // If lang is hebrew add RTL class to document.body
        if (lang === 'he') document.body.classList.add('rtl')
        else document.body.classList.remove('rtl')

        i18nService.doTrans()
        //TODO
        // loadTickets()   
    }


    const onOpenLoginPage = () => {
        // this.props.history.push('/login')
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

     console.log('loggedInUser', loggedInUser)
    return (
        // <header className="">
        <section className="header-container full">
            <div className="main-layout">
            <div className="header-logo-container">
                <div className="header-options">
                    <select onChange={onSetLang} className="lang-option">
                        <option value="he" data-trans="langHe">עברית</option>
                        <option value="en" data-trans="langEn">English</option>
                    </select>
                    <div className="header-nav-bar">
                        {/* <button className="header-btn-signin">Signin</button>
                            <button className="header-btn-login">Login</button> */}
                            
                       {!loggedInUser && <button onClick={onOpenSignupPage} data-trans="signup">התחברות</button>}
                        {!loggedInUser &&  <button onClick={onOpenLoginPage} data-trans="login">כניסה</button>}

                        <div className="avatar-container">
                            {loggedInUser && <img className="avatar-img" src={avatar} onClick={onToggleMenu} alt="Avatar"></img>}
                        </div>
                        <div className="profile-container">
                            {profileMenu && <ProfileMenu onLogout={onLogout} user={loggedInUser} closeMenu={onToggleMenu} />}
                        </div>
                    </div>
                </div>
                <img className="header-logo" src={logo_big_bg} alt="logo"></img>
            </div>
          
            </div>
            <UserMsg />
         </section> 
    // </header>
    )
}

export default AppHeader;

