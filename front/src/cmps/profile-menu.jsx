import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'


export const ProfileMenu = ({ onLogout, user, closeMenu, onGoToEvents }) => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)

    return (
        // <section className="profile-menu-wrapper">
            <div className="profile-menu">
                {/* <div className="Menu-subcategory"></div> */}
                <ul className="sub-category clean-list">
                    {user && <li className="menu-item" data-trans="hello">שלום <span>{user.userName}</span></li>}
                    <li className="menu-item" onClick={() => closeMenu()} data-trans="addEvent"><NavLink to={`/event/edit`} className="menu-item">הוסף ארוע</NavLink></li>
                    <li className="menu-item" onClick={() => closeMenu()} data-trans="events"><NavLink to={`/event/user/${loggedInUser._id}`} className="menu-item">ארועים</NavLink></li>
                    <li className="menu-item logout" onClick={() => onLogout()} data-trans="logout"><NavLink to={`/`} className="menu-item">התנתק</NavLink></li>
                </ul>
            </div>
        // </section>
    )
}