import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { AxiosProvider } from "./context/AxiosProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AxiosProvider>
                    <Routes>
                        <Route path="/*" element={<App/>}/>
                    </Routes>
                </AxiosProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)