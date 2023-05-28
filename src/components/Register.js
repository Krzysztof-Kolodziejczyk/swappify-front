import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import axios from "../api/axios";

const REGISTER_URL = '/signup';

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Register() {
    const navigate = useNavigate();

    const[formValue, setFormValue] = useState({
       username: '',
       password: '',
       matchPassword: '',
       email: '',
    });

    const[validData, setValidData] = useState({
       username: false,
       password: false,
       matchPassword: false,
       email: false,
    });

    const[errMsg, setErrMsg] = useState('');

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const usernameTest = USER_REGEX.test(formValue.username);
        const emailTest = EMAIL_REGEX.test(formValue.email);
        const passwordTest = PASS_REGEX.test(formValue.password);
        const matchTest = formValue.password === formValue.matchPassword;

        setValidData({
            username: usernameTest,
            email: emailTest,
            password: passwordTest,
            matchPassword: matchTest
        });
    }, [formValue.username, formValue.email, formValue.password, formValue.matchPassword])

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(REGISTER_URL,
                JSON.stringify({
                    email: formValue.email,
                    username: formValue.username,
                    password: formValue.password
                }),
                {
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true
                });
            navigate('/login', { replace: true, state: {msg: 'You can log in now!'}});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response.status === 409) {
                setErrMsg(err.response?.data)
            } else {
                setErrMsg('Register failed');
            }
        }
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <div className="text-center mb-3 ">
                <p className='fs-3 fw-bold'>Register</p>
            </div>
            <p className={ !errMsg ? "d-none" : "text-center mb-3 fs-3 fw-bold"}>
                {errMsg}
            </p>
            <MDBInput wrapperClass='mb-0'
                      label='Username'
                      id='form1'
                      type='text'
                      name='username'
                      onChange={onChange}
            />
            <span id='text' className={ validData.username ? 'd-none' : 'form-text mt-0' } >
                    Username must begin with letter and have at least 4 chars.
            </span>

            <MDBInput wrapperClass='mb-0 mt-4'
                      label='Email'
                      id='form1'
                      type='email'
                      name='email'
                      onChange={onChange}
            />
            <span id='text' className={ validData.email ? 'd-none' : 'form-text mt-0' } >
                    Provide correct email.
            </span>

            <MDBInput wrapperClass='mb-0 mt-4'
                      label='Password'
                      id='form1'
                      type='password'
                      name='password'
                      onChange={onChange}
            />
            <span id='text' className={ validData.password ? 'd-none' : 'form-text mt-0' } >
                    Passwords should have at least 8 chars, contain big letter, number and special char.
            </span>

            <MDBInput wrapperClass='mb-0 mt-4'
                      label='Confirm password'
                      id='form1'
                      type='password'
                      name='matchPassword'
                      onChange={onChange}
            />
            <span id='text' className={ validData.matchPassword ? 'd-none' : 'form-text mt-0' } >
                    Passwords are not equal!
            </span>

            <MDBBtn className={validData.username && validData.email && validData.password
                               && validData.matchPassword ? "w-100" : "disabled"}
                    color={"success"}
                style={{marginTop:'20px'}}
                    onClick={handleRegister}>Sign up</MDBBtn>
            <p className="text-center mt-1">Already have an account? <Link to='/login'>Log in here!</Link></p>
        </MDBContainer>
    );
}

export default Register;
