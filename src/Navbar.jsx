import './css/navbar.css';
import { NavLink } from 'react-router-dom';

import { LibraryBooks, Archive } from '@material-ui/icons';

const Navbar = () => {

    return(
        <nav id="navbar">
            <ul>
                <NavLink to="/activity" className={({ isActive }) => isActive ? "active-page" : ""}><li><LibraryBooks /><span>Activity Feed</span></li></NavLink>
                <NavLink to="/archive" className={({ isActive }) => isActive ? "active-page" : ""}><li><Archive /><span>Archive</span></li></NavLink>
            </ul>
        </nav>
    )
}

export default Navbar;