import React, {useContext, useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';

import AuthContext from "../context/AuthProvider";
import {NavLink, useNavigate} from "react-router-dom";
import {AxiosContext} from "../context/AxiosProvider";

const LOGOUT_URL = '/signout';

const NavBar = () => {
    const [showNavColor, setShowNavColor] = useState(false);

    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        try {
            axiosContext.authAxios.get(LOGOUT_URL).then();
            authContext.logout();
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MDBNavbar expand='lg' dark bgColor='success'>
            <MDBContainer fluid>
                <NavLink to='/'>
                    <MDBNavbarBrand>Swappify</MDBNavbarBrand>
                </NavLink>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavColor(!showNavColor)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse show={showNavColor} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        <MDBNavbarItem className={!authContext.isAuthenticated() ? 'd-none' : ''}>
                            <NavLink to='/addItem' className='nav-link'>
                                <MDBIcon icon="folder-plus" size="2x" className='m-4'/>
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className={!authContext.isAuthenticated() ? 'd-none' : ''}>
                            <NavLink to='/items' className='nav-link'>
                                <MDBIcon icon="file-image" size="2x" className='m-4'/>
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <NavLink to='/profile' className='nav-link'>
                                <MDBIcon icon="user" size="2x" className='m-4'/>
                            </NavLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className={!authContext.isAuthenticated() ? 'd-none' : ''}>
                            <NavLink to='/login' className='nav-link' onClick={handleLogout}>
                                <MDBIcon icon="sign-out-alt" size="2x" className='m-4' />
                            </NavLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );

}

export default NavBar;