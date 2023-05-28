import React from 'react';

function CustomDialog({ isOpen, onClose, title, content }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="custom-dialog">
            <div className="custom-dialog-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CustomDialog;
