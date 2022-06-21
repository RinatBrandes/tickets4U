import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'


export const ProfileMenu = ({ onLogout, user, closeMenu, onGoToEvents }) => {
    const { loggedInUser } = useSelector((storeState) => storeState.userModule)

    return (
        // <section className="profile-menu-wrapper">
            <div className="profile-menu">
                {/* <div className="Menu-subcategory"></div> */}
                <ul className="sub-category clean-list">
                    {user && <li className="menu-item" data-trans="hello">Hello <span>{user.userName}</span></li>}
                    <li className="menu-item" onClick={() => closeMenu()} data-trans="addEvent"><NavLink to={`/event/edit`} className="menu-item">Add event</NavLink></li>
                    <li className="menu-item" onClick={() => closeMenu()} data-trans="events"><NavLink to={`/event/user/${loggedInUser._id}`} className="menu-item">Events</NavLink></li>
                    <li className="menu-item logout" onClick={() => onLogout()} data-trans="logout"><NavLink to={`/`} className="menu-item">Logout</NavLink></li>
                </ul>
            </div>
        // </section>
    )
}