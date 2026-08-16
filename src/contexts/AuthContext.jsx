import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('admin_user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Default credentials
        if (email === 'admin@dashboard.com' && password === 'admin123') {
            const userData = {
                id: '1',
                name: 'John Doe',
                email: 'admin@dashboard.com',
                role: 'Administrator',
                avatar: '/src/assets/avatar.png'
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('admin_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('admin_user');
    };

    const updateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('admin_user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
