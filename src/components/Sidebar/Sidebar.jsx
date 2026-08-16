import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    MdDashboard,
    MdInventory,
    MdAddBox,
    MdPeople,
    MdShoppingCart,
    MdCategory,
    MdPayment,
    MdPerson,
    MdSettings,
    MdLogout
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: <MdDashboard /> },
        { name: 'Products', path: '/products', icon: <MdInventory /> },
        { name: 'Add Product', path: '/add-product', icon: <MdAddBox /> },
        { name: 'Customers', path: '/customers', icon: <MdPeople /> },
        { name: 'Orders', path: '/orders', icon: <MdShoppingCart /> },
        { name: 'Categories', path: '/categories', icon: <MdCategory /> },
        { name: 'Payments', path: '/payments', icon: <MdPayment /> },
        { name: 'Profile', path: '/profile', icon: <MdPerson /> },
        { name: 'Settings', path: '/settings', icon: <MdSettings /> },
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-box">
                    <h2>ADMIN</h2>
                </div>
                <button className="sidebar-close" onClick={closeSidebar}>×</button>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                                onClick={() => {
                                    if (window.innerWidth <= 768) closeSidebar();
                                }}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li className="logout-item">
                        <button onClick={handleLogout} className="nav-item logout-btn">
                            <span className="nav-icon"><MdLogout /></span>
                            <span className="nav-text">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
