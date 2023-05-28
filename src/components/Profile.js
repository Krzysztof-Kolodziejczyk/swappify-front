import React, {useContext, useEffect, useState} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import NavBar from "./NavBar";
import AuthContext from "../context/AuthProvider";
import {AxiosContext} from "../context/AxiosProvider";
import axios from "../api/axios";

const GET_USER_INFO = 'details'
const UPDATE_USER_DETAILS = 'update'

const Profile = () => {

    const axios = useContext(AxiosContext);
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState('user@example.com');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.publicAxios.get(GET_USER_INFO, {
            headers: {'Authorization': authContext.getAccessToken()}
        }).then(response => {
            setEmail(response.data.email)
        });
    }, [axios, authContext]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords are not the same');
        } else {
            axios.publicAxios.post(UPDATE_USER_DETAILS, JSON.stringify({
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword
            }), {
                headers: {
                    'Authorization': authContext.getAccessToken(),
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setError('changes has been saved')
            }).catch(() => {
                setError('Invalid password');
            })
        }
    };

    return (
        <>
            <NavBar/>
            <MDBContainer className="text-center mt-5">
                <MDBRow className="justify-content-center">
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle className="font-weight-bold">Profil użytkownika</MDBCardTitle>
                                <MDBCardText>
                                    <MDBInput
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="mb-3"
                                        outline
                                    />
                                    <MDBInput
                                        type="password"
                                        label="Stare hasło"
                                        value={oldPassword}
                                        onChange={handleOldPasswordChange}
                                        className="mb-3"
                                        outline
                                    />
                                    <MDBInput
                                        type="password"
                                        label="Nowe hasło"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        className="mb-3"
                                        outline
                                    />
                                    <MDBInput
                                        type="password"
                                        label="Potwierdź nowe hasło"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className="mb-3"
                                        outline
                                    />
                                    {error && <div style={{color: 'danger', marginBottom: '20px'}}>{error}</div>}
                                </MDBCardText>
                                <MDBBtn onClick={handleSave}>Zapisz</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default Profile;
