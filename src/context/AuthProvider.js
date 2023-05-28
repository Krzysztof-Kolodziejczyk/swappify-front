import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const[auth, setAuth] = useState({
        accessToken: null,
        authenticated: false,
        roles: []
    });

    const getAccessToken = () => {
        return auth.accessToken;
    }

    const logout = () => {
        setAuth({
            accessToken: null,
            authenticated: false,
            roles: []
        });
    }

    const isAuthenticated = () => {
        return auth.authenticated;
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, getAccessToken, logout, isAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;