import React from 'react';
import {
    MDBListGroup,
    MDBIcon,
    MDBCollapse,
    MDBNavbarNav, MDBNavbarItem
} from 'mdb-react-ui-kit';

function Sidebar({ onLike, onMatch}) {

    return (
        <MDBListGroup>
            <MDBCollapse show='true' navbar>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    <MDBNavbarItem onClick={onLike}>
                        <MDBIcon
                            icon="heart"
                            size="2x"
                            className='m-3 nav-link'
                            title="your liked items"
                        />
                    </MDBNavbarItem>
                    <MDBNavbarItem onClick={onMatch}>
                        <MDBIcon
                            icon="exchange-alt"
                            size="2x"
                            className='m-3 nav-link'
                            title="your matches"/>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBListGroup>
    );
}

export default Sidebar;
