import { NavLink } from "react-router-dom";

export const ProfileMenu = ({ onLogout, user, closeMenu }) => {

    return (
        <section className="profile-menu-wrapper">
            <div className="profile-menu">
                {/* <div className="Menu-subcategory"></div> */}
                <ul className="sub-category clean-list">
                    {user && <li className="menu-item" data-trans="יקךךם">שלום <span>{user.userName}</span></li>} 
                    <li className="menu-item" onClick={() => closeMenu()} data-trans="addEvent"><NavLink to={`/event`} className="menu-item">הוסף ארוע</NavLink></li>                                        
                    <li className="menu-item logout" onClick={() => onLogout()} data-trans="logout"><NavLink to={`/`} className="menu-item">התנתק</NavLink></li>
                </ul>
            </div>
        </section>
    )
}