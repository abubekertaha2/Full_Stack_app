import React from 'react';

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal" style={modalOverlayStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <h4 style={{ margin: '0 0 10px' }}>Confirm Deletion</h4>
                <p style={{ margin: '0 0 20px' }}>Are you sure you want to delete this student?</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onConfirm} className="btn btn-danger">Yes</button>
                    <button onClick={onCancel} className="btn btn-secondary">No</button>
                </div>
            </div>
        </div>
    );
};

// Inline styles for the modal
const modalOverlayStyle = {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(38, 46, 114, 0.56)',
    zIndex: 1000, // Ensure it covers other content
};

const modalContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px', // Adjust width for a smaller modal
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default ConfirmationModal;