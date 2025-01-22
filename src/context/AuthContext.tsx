import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext<{
    token: string | null;
    isLoggedIn: boolean;
    setToken: (token: string | null) => void;
}>({
    token: null,
    isLoggedIn: false,
    setToken: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const isLoggedIn = !!token;

    const handleSetToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, setToken: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
