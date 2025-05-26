import React, { useState } from 'react';
import '../styles/verification.css';

interface EmailVerificationProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (code: string) => void;
    email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
    isOpen,
    onClose,
    onVerify,
    email
}) => {
    const [verificationCode, setVerificationCode] = useState('');

    if (!isOpen) {return null;}

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onVerify(verificationCode);
    };

    return (
        <div className="email-verification-modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="popup">
                <h2 className="title">Email Verification</h2>
                <p className="message">
                    We've sent a verification code to:<br />
                    <strong>{email}</strong><br />
                    Please enter the code below to complete your registration.
                </p>
                <form onSubmit={handleSubmit} className="verification-form">
                    <input
                        type="text"
                        className="verification-input"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                    />
                    <div className="buttons">
                        <button type="button" className="cancelButton" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="confirmButton"
                            disabled={!verificationCode}
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailVerification; 