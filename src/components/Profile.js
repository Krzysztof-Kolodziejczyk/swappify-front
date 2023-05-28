import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import NavBar from "./NavBar";


const Profile = () => {
    const [email, setEmail] = useState('user@example.com');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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
            setError('Hasła nie są takie same');
        } else {
            setError('');
            // Wysłanie zmienionych danych na serwer lub wykonanie innych akcji
            console.log('Zapisano zmiany: Email:', email, 'Stare hasło:', oldPassword, 'Nowe hasło:', newPassword);
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
