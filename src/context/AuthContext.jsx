import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const api = axios.create({
        baseURL: baseURL,
    });

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['x-auth-token'] = token;
            try {
                const res = await api.get('/users/profile');
                setUser(res.data);
            } catch (err) {
                console.error("Session expired or invalid", err);
                localStorage.removeItem('token');
                delete api.defaults.headers.common['x-auth-token'];
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['x-auth-token'] = res.data.token;
        sessionStorage.setItem('just_logged_in', 'true');
        // Fetch profile immediately to update state
        // Or just decode token if it has info, but profile fetch is safer
        await checkUserLoggedIn();
        return res.data;
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['x-auth-token'] = res.data.token;
        sessionStorage.setItem('just_logged_in', 'true');
        await checkUserLoggedIn();
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['x-auth-token'];
        setUser(null);
        window.dispatchEvent(new Event('auth:logout'));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user, refreshUser: checkUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
