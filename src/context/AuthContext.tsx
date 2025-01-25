import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const AuthContext = createContext<{
    token: string | null;
    isLoggedIn: boolean;
    user: any | null;
    setToken: (token: string | null) => void;
    setUser: (user: any | null) => void;
}>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<any | null>(null);
    const isLoggedIn = !!token;

    const handleSetToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
            fetchUserDetails(newToken);
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
        setToken(newToken);
    };

    const fetchUserDetails = async (token: string) => {
        try {
            const response = await axiosInstance.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        if (token) fetchUserDetails(token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, user, setToken: handleSetToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
