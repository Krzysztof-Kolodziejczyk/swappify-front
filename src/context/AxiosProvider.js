import React, { createContext, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthProvider";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const publicAxios = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const imageAxios = axios.create({
        baseURL: 'http://localhost:8081'
    });

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `${authContext.getAccessToken()}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const refreshAuthLogic = failedRequest => {
        const data = {
            refreshToken: authContext.auth.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: 'http://localhost:8080/api/token/refresh'
        };
        return axios(options)
            .then(async tokenRefreshResponse => {
                failedRequest.response.config.headers.Authorization =
                    'Bearer ' + tokenRefreshResponse.data.token;

                authContext.setAuth({
                    ...authContext.auth,
                    accessToken: tokenRefreshResponse.data.token,
                });

                return Promise.resolve();
            })
            .catch(() => {
                authContext.setAuth({
                    accessToken: null,
                    refreshToken: null,
                    authenticated: false,
                    roles: []
                });
            });
    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
                imageAxios
            }}>
            {children}
        </Provider>
    );
}

export { AxiosContext, AxiosProvider }