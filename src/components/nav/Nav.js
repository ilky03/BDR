import { NavLink } from 'react-router-dom';
import './nav.scss';

import homeIcon from '../../resources/img/icons/home.svg';
import monitoringIcon from '../../resources/img/icons/monitoring.svg';
import settingIcon from '../../resources/img/icons/setting.svg';

function AppHeader() {
    return (
        <>
            <nav className="nav">
                <ul className="nav__link">
                    <li><NavLink to='/' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}>Головна</NavLink></li>
                    <li><NavLink to='/statistics' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}>Статистика</NavLink></li>
                    <li><NavLink to='/settings' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}>Налаштування</NavLink></li>
                </ul>
            </nav>
            <nav className="nav_bottom">
                <ul className="nav__link">
                    <li><NavLink to='/' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}><img src={homeIcon} alt="home icon" />Головна</NavLink></li>
                    <li><NavLink to='/statistics' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}><img src={monitoringIcon} alt="statistics icon" />Статистика</NavLink></li>
                    <li><NavLink to='/settings' style={({isActive}) => ({borderBottom: isActive ? '2px solid' : 'none'})}><img src={settingIcon} alt="settings icon" />Налаштування</NavLink></li>
                </ul>
            </nav>
        </>

    )
}

export default AppHeader;