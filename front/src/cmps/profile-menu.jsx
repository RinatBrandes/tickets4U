import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import logout from '../assets/img/logout.svg'

export const ProfileMenu = ({ onLogout, user, closeMenu, onGoToEvents }) => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)
    const { t } = useTranslation()

    return (
        // <section className="profile-menu-wrapper">
            <div className="profile-menu">
                {/* <div className="Menu-subcategory"></div> */}
                <ul className="sub-category clean-list">
                    {user && <li className="menu-item">{t('hello')} <span>{user.userName}</span></li>}
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/event/edit`} className="menu-item">{t('addEvent')}</NavLink></li>
                    <li className="menu-item" onClick={() => closeMenu()}><NavLink to={`/event/user/${loggedInUser._id}`} className="menu-item">{t('events')}</NavLink></li>
                    <li className="menu-item logout" onClick={() => onLogout()}><NavLink to={`/`} className="menu-item  logout-menu">{t('logout')} 
                        <img src={logout} className="profile-logout-img"></img>
                    </NavLink></li>
                </ul>
            </div>
        // </section>
    )
}