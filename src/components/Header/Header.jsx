// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     MdSearch,
//     MdSettings,
//     MdNotifications,
//     MdMenu,
//     MdNotificationsNone,
//     MdClose
// } from 'react-icons/md';
// import { useAuth } from '../../contexts/AuthContext';
// import profileAvatar from '../../assets/avatar.png';
// import './Header.css';

// const Header = ({ title, toggleSidebar, onSearch }) => {
//     const navigate = useNavigate();
//     const { user } = useAuth();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [isSearchActive, setIsSearchActive] = useState(false);
//     const notificationRef = useRef(null);

//     // Mock notifications - you can replace with real data from context
//     const [notifications, setNotifications] = useState([
//         { id: 1, message: 'New order #1234 received', time: '5 min ago', read: false },
//         { id: 2, message: 'Payment confirmed for order #1233', time: '1 hour ago', read: false },
//         { id: 3, message: 'Customer John Doe registered', time: '2 hours ago', read: true },
//     ]);

//     const unreadCount = notifications.filter(n => !n.read).length;

//     useEffect(() => {
//         // Close notifications when clicking outside
//         const handleClickOutside = (event) => {
//             if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//                 setShowNotifications(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchQuery(value);
//         if (onSearch) {
//             onSearch(value);
//         }
//     };

//     const handleProfileClick = () => {
//         navigate('/profile');
//     };

//     const handleSettingsClick = () => {
//         navigate('/settings');
//     };

//     const toggleNotifications = () => {
//         setShowNotifications(!showNotifications);
//     };

//     const markAsRead = (id) => {
//         setNotifications(prev =>
//             prev.map(n => n.id === id ? { ...n, read: true } : n)
//         );
//     };

//     const clearAllNotifications = () => {
//         setNotifications([]);
//         setShowNotifications(false);
//     };

//     const toggleSearch = () => {
//         setIsSearchActive(!isSearchActive);
//     };

//     return (
//         <header className="header">
//             <div className="header-left">
//                 <button className="menu-toggle" onClick={toggleSidebar}>
//                     <MdMenu size={24} />
//                 </button>
//                 <h2>{title}</h2>
//             </div>
//             <div className="header-right">
//                 <div className={`search-bar-container ${isSearchActive ? 'active' : ''}`}>

//                     <div className="search-bar">
//                         <MdSearch className="search-icon-input" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                         />
//                         {isSearchActive && (
//                             <button className="close-search" onClick={toggleSearch}>
//                                 <MdClose size={20} />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Mobile Search Icon Trigger */}
//                 <button className="mobile-search-trigger" onClick={toggleSearch}>
//                     <MdSearch size={24} />
//                 </button>

//                 <div className="header-icons">
//                     <div className="icon-item" onClick={handleSettingsClick} title="Settings">
//                         <MdSettings size={24} className="icon" />
//                     </div>

//                     <div className="icon-badge" onClick={toggleNotifications} ref={notificationRef} title="Notifications">
//                         {unreadCount > 0 ? (
//                             <MdNotifications size={24} className="icon" />
//                         ) : (
//                             <MdNotificationsNone size={24} className="icon" />
//                         )}

//                         {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

//                         {/* Notifications Dropdown */}
//                         {showNotifications && (
//                             <div className="notifications-dropdown">
//                                 <div className="notifications-header">
//                                     <h4>Notifications</h4>
//                                     {notifications.length > 0 && (
//                                         <button onClick={clearAllNotifications} className="clear-all">Clear All</button>
//                                     )}
//                                 </div>
//                                 <div className="notifications-list">
//                                     {notifications.length === 0 ? (
//                                         <div className="no-notifications">
//                                             <MdNotificationsNone className="no-notif-icon" />
//                                             <p>No new notifications</p>
//                                         </div>
//                                     ) : (
//                                         notifications.map(notif => (
//                                             <div
//                                                 key={notif.id}
//                                                 className={`notification-item ${notif.read ? 'read' : 'unread'}`}
//                                                 onClick={() => markAsRead(notif.id)}
//                                             >
//                                                 <div className="notif-content">
//                                                     <p className="notif-message">{notif.message}</p>
//                                                     <span className="notif-time">{notif.time}</span>
//                                                 </div>
//                                                 {!notif.read && <div className="unread-dot"></div>}
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="user-profile" onClick={handleProfileClick}>
//                         <img
//                             src={user?.avatar || profileAvatar}
//                             alt="User"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = profileAvatar;
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

























import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdSearch,
    MdSettings,
    MdNotifications,
    MdMenu,
    MdNotificationsNone,
    MdClose
} from 'react-icons/md';
import { useAuth } from '../../contexts/AuthContext';
import profileAvatar from '../../assets/avatar.png';
import './Header.css';

const Header = ({ title, toggleSidebar, onSearch }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const notificationRef = useRef(null);

    // Mock notifications - you can replace with real data from context
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New order #1234 received', time: '5 min ago', read: false },
        { id: 2, message: 'Payment confirmed for order #1233', time: '1 hour ago', read: false },
        { id: 3, message: 'Customer John Doe registered', time: '2 hours ago', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        // Close notifications when clicking outside
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    // Safe helper to resolve avatar image source, preventing blob URL crashes
    const getAvatarSrc = () => {
        const avatar = user?.avatar || user?.profileImage;
        if (!avatar || typeof avatar !== 'string' || avatar.startsWith('blob:')) {
            return profileAvatar;
        }
        return avatar;
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <MdMenu size={24} />
                </button>
                <h2>{title}</h2>
            </div>
            <div className="header-right">
                <div className={`search-bar-container ${isSearchActive ? 'active' : ''}`}>

                    <div className="search-bar">
                        <MdSearch className="search-icon-input" size={20} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {isSearchActive && (
                            <button className="close-search" onClick={toggleSearch}>
                                <MdClose size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Search Icon Trigger */}
                <button className="mobile-search-trigger" onClick={toggleSearch}>
                    <MdSearch size={24} />
                </button>

                <div className="header-icons">
                    <div className="icon-item" onClick={handleSettingsClick} title="Settings">
                        <MdSettings size={24} className="icon" />
                    </div>

                    <div className="icon-badge" onClick={toggleNotifications} ref={notificationRef} title="Notifications">
                        {unreadCount > 0 ? (
                            <MdNotifications size={24} className="icon" />
                        ) : (
                            <MdNotificationsNone size={24} className="icon" />
                        )}

                        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="notifications-dropdown">
                                <div className="notifications-header">
                                    <h4>Notifications</h4>
                                    {notifications.length > 0 && (
                                        <button onClick={clearAllNotifications} className="clear-all">Clear All</button>
                                    )}
                                </div>
                                <div className="notifications-list">
                                    {notifications.length === 0 ? (
                                        <div className="no-notifications">
                                            <MdNotificationsNone className="no-notif-icon" />
                                            <p>No new notifications</p>
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div
                                                key={notif.id}
                                                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                                                onClick={() => markAsRead(notif.id)}
                                            >
                                                <div className="notif-content">
                                                    <p className="notif-message">{notif.message}</p>
                                                    <span className="notif-time">{notif.time}</span>
                                                </div>
                                                {!notif.read && <div className="unread-dot"></div>}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="user-profile" onClick={handleProfileClick}>
                        <img
                            src={getAvatarSrc()}
                            alt="User"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = profileAvatar;
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;