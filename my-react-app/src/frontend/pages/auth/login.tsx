// Suggested code may be subject to a license. Learn more: ~LicenseLog:277995103.
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import InputField from '../../components/Auth/InputField';
import Checkbox from '../../components/Auth/Checkbox';
import SubmitButton from '../../components/Auth/SubmitButton';
import LeftPanel from '../../components/Auth/LeftPanel';
import '../../styles/register.css';
import '../../styles/gradientbg.scss'
import { Link, useNavigate } from 'react-router-dom';
import EmailVerification from '../../components/Auth/EmailVerification';
import { useAuth } from '../../context/auth';

const InteractiveBubble: React.FC = () => {
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (bubbleRef.current) {
                bubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        };

        const handleMouseMove = (event: MouseEvent) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <div ref={bubbleRef} className="interactive"></div>;
};

interface LoginFormData {
    userIdentifier: string;
    password: string;
}
const App: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        userIdentifier: '',
        password: '',
    });
    const [identifierType, setIdentifierType] = useState<'email' | 'username' | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
    const [verificationInProgress, setVerificationInProgress] = useState(false);
    const [UID, setUID] = useState(null);
    // Check for cookie on component mount
    const navigate = useNavigate();
    useEffect(() => {
        const checkCookie = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/check-cookie', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies
                });
                console.log(response)
                if (response.ok) {
                    const result = await response.json();
                    if (result.userId) {
                        // Set userId in sessionStorage
                        sessionStorage.setItem('userId', result.userId);
                        // Redirect to main page
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error('Error checking cookie:', error);
            }
        };

        checkCookie();
    }, [navigate]);
    const validateIdentifier = (value: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(value)) {
            setIdentifierType('email');
        } else {
            setIdentifierType('username');
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'userIdentifier') {
            validateIdentifier(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!isFormValid()) {
            setErrorMessage('Please fill in all information correctly!');
            return;
        }

        // Special handling for admin account
        if (formData.userIdentifier === 'admin' && formData.password === 'admin') {
            login('admin', 'admin', true);
            setSuccessMessage('Login successful! Redirecting to admin dashboard...');
            setTimeout(() => {
                navigate('/admin');
            }, 1500);
            return;
        }

        try {
            const loginResponse = await fetch("https://localhost:8081/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    identifierType,
                }),
            });

            const loginResult = await loginResponse.json();

            if (!loginResponse.ok) {
                setErrorMessage(loginResult.message || "Login failed");
                return;
            }
            setUID(loginResult.userId);

            const verificationResponse = await fetch("https://localhost:8081/api/verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.userIdentifier,
                    username: null,
                    identifierType,
                }),
            });

            if (!verificationResponse.ok) {
                const error = await verificationResponse.json();
                setErrorMessage(error.message || "Failed to send verification email.");
                return;
            }
            console.log(await verificationResponse.json());
            setIsEmailVerificationOpen(true);
            setVerificationInProgress(true);

        } catch (error) {
            console.error("Login or verification error:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };
    const handleVerificationComplete = async (code: string) => {
        try {
            const verificationResponse = await fetch("https://localhost:8081/api/verify-code", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.userIdentifier,
                    code,
                    identifierType,
                    UID
                })
            });

            if (verificationResponse.ok) {
                const result = await verificationResponse.json();
                setVerificationInProgress(false);
                setIsEmailVerificationOpen(false);
                
                // Use the auth context to handle login
                login(
                    String(UID),
                    result.username || formData.userIdentifier,
                    result.isAdmin || false
                );
                
                setSuccessMessage('Login successful! Redirecting...');
                // Redirect after showing success message
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                const errorData = await verificationResponse.json();
                setErrorMessage(errorData.message || "Invalid verification code. Try again!");
            }
        } catch (error) {
            console.error("Verification error:", error);
            setErrorMessage("Something went wrong during verification.");
        }
    };
    const isFormValid = () => {
        const { userIdentifier, password } = formData;
        if (!userIdentifier.trim() || !password.trim()) { return false };
        // return (
        //     formData.username.trim() &&
        //     formData.email.trim() &&
        //     formData.password.trim()
        // );
        if (userIdentifier.includes('@')) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(userIdentifier);
        }
        return userIdentifier.length >= 3;
    };
    return (
        <div className="pageWrapper">
            <LeftPanel />

            <div className="rightPanel">
                <form onSubmit={handleSubmit} className="form">
                    <h2 className="formTitle">Login</h2>

                    {errorMessage && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{ 
                            color: 'white', 
                            marginBottom: '1rem', 
                            textAlign: 'center',
                            backgroundColor: '#4CAF50',
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {successMessage}
                        </div>
                    )}

                    <InputField
                        label="Email or Username"
                        type="text"
                        name="userIdentifier"
                        value={formData.userIdentifier}
                        onChange={handleInputChange}
                        placeholder="Enter email or username"
                    />

                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />

                    <SubmitButton disabled={!isFormValid()} label="Login" />
                    <div className="loginLink">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </form>
                <EmailVerification
                    isOpen={isEmailVerificationOpen}
                    onClose={() => {
                        setIsEmailVerificationOpen(false);
                        sessionStorage.removeItem('userId');
                    }}
                    onVerify={handleVerificationComplete}
                    email={formData.userIdentifier}
                />
            </div>

            <div className="gradient-bg">

                {/* mix color */}
                <svg xmlns="https://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix
                                in="blur"
                                type="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                result="goo"
                            />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                {/* Colors */}

                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    {/* <div className="interactive"></div> */}
                    <InteractiveBubble />
                </div>


            </div>
        </div>
    );
};

// export { App, InteractiveBubble };
export default function Login() {
    return (
        <div>
            <App />
        </div>
    );
}
