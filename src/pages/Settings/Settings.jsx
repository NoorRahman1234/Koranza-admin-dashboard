import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useCurrency } from '../../contexts/CurrencyContext';
import './Settings.css';

const Settings = ({ toggleSidebar }) => {
    const { currency, updateCurrency, availableCurrencies } = useCurrency();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        orderUpdates: true,
        newsletter: false,
        language: 'en',
        timezone: 'UTC',
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSelectChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleCurrencyChange = (e) => {
        updateCurrency(e.target.value);
    };

    return (
        <div className="page-wrapper">
            <Header title="Settings" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="settings-grid">
                    {/* Notifications Settings */}
                    <div className="settings-card">
                        <h3>Notification Preferences</h3>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Email Notifications</span>
                                <span className="setting-description">Receive email updates</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Order Updates</span>
                                <span className="setting-description">Get notified about order status</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.orderUpdates}
                                    onChange={() => handleToggle('orderUpdates')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Newsletter</span>
                                <span className="setting-description">Subscribe to our newsletter</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.newsletter}
                                    onChange={() => handleToggle('newsletter')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Regional Settings */}
                    <div className="settings-card">
                        <h3>Regional Settings</h3>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Language</span>
                                <span className="setting-description">Select your preferred language</span>
                            </div>
                            <select
                                value={settings.language}
                                onChange={(e) => handleSelectChange('language', e.target.value)}
                                className="settings-select"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ko">Korean</option>
                            </select>
                        </div>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Currency</span>
                                <span className="setting-description">Select display currency</span>
                            </div>
                            <select
                                value={currency}
                                onChange={handleCurrencyChange}
                                className="settings-select"
                            >
                                {availableCurrencies.map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>
                        <div className="settings-item">
                            <div className="setting-info">
                                <span className="setting-label">Timezone</span>
                                <span className="setting-description">Your local timezone</span>
                            </div>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleSelectChange('timezone', e.target.value)}
                                className="settings-select"
                            >
                                <option value="UTC">UTC</option>
                                <option value="EST">EST</option>
                                <option value="PST">PST</option>
                                <option value="IST">IST</option>
                            </select>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="settings-card">
                        <h3>Security</h3>
                        <div className="security-actions">
                            <button className="action-btn">Change Password</button>
                            <button className="action-btn danger">Clear Cache</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
