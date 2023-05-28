import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdb-react-ui-kit';

function PopupComponent({ isOpen, toggleModal, isMatch, onClose }) {
    const popupStyles = {
        backgroundColor: 'white', // Ustawia tło popupu na białe
        fontFamily: 'Arial, sans-serif', // Ustawia czcionkę na Arial
    };

    return (
        <MDBModal show={isOpen} tabIndex="-1" role="dialog" >
            <MDBModalBody>
                {isMatch ? 'Match!' : 'Liked!'}
            </MDBModalBody>
            <MDBModalFooter>
                <button onClick={() => { toggleModal(); onClose(); }}>Zamknij</button>
            </MDBModalFooter>
        </MDBModal>
    );
}

export default PopupComponent;