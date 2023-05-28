import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    MDBContainer,
    MDBBtn,
    MDBInput
}
    from 'mdb-react-ui-kit';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";


const LOGIN_URL = '/login';

function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const[password, setPassword] = useState('');
    const[username, setUsername] = useState('');

    const[errMsg, setErrMsg] = useState(location.state?.msg || '');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    username,
                    password
                }),
                {
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true
                });
            setAuth({
                    accessToken: response.headers.getAuthorization(),
                    authenticated: true,
                    roles: ['ROLE_USER']
            });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response.status === 409) {
                setErrMsg(err.response?.data)
            } else {
                setErrMsg('Login failed');
            }
        }
    }


    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <div className="text-center mb-3 fw-2">
                <p className='fs-3 fw-bold'>Login</p>
            </div>
            <p className={ !errMsg ? "d-none" : "text-center mb-3 fs-4"}>
                {errMsg}
            </p>
            <MDBInput wrapperClass='mb-4'
                      label='username'
                      id='form1'
                      type='username'
                      onChange={(e) => setUsername(e.target.value)}
            />

            <MDBInput wrapperClass='mb-4'
                      label='Password'
                      id='form2'
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn className="mb-4 w-100"
                    onClick={handleLogin}
                    color={"success"}
            >Sign in</MDBBtn>
            <p className="text-center">Not a member? <Link to='/register'>Register</Link></p>
        </MDBContainer>
    );
}

export default Login;
