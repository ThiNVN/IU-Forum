// Suggested code may be subject to a license. Learn more: ~LicenseLog:277995103.
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import InputField from '../../components/Auth/InputField';
import Checkbox from '../../components/Auth/Checkbox';
import SubmitButton from '../../components/Auth/SubmitButton';
import LeftPanel from '../../components/Auth/LeftPanel';
import EmailVerification from '../../components/Auth/EmailVerification';
import { Navigate } from 'react-router-dom';
import '../../styles/register.css';
import '../../styles/gradientbg.scss'
import { Link } from 'react-router-dom';

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

interface RegisterFormData {
    username: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
    const [verificationInProgress, setVerificationInProgress] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill in all information correctly!');
            return;
        }

        try {
            const verificationResponse = await fetch("https://localhost:8081/api/verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username
                }),
            });
            if (verificationResponse.ok) {
                setIsEmailVerificationOpen(true);
                setVerificationInProgress(true);
            } else {
                const errorData = await verificationResponse.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error during verification:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    const handleVerificationComplete = async (code: string) => {
        try {
            const verificationResponse = await fetch("https://localhost:8081/api/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    code: code,
                }),
            });
            if (verificationResponse.ok) {
                const registerResponse = await fetch("https://localhost:8081/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (registerResponse.ok) {
                    alert("Registration successful! Please login to continue.");
                    /*redirect login Navigate("/login")*/
                } else {
                    const errorData = await registerResponse.json();
                    alert(errorData.message);
                }
            } else {
                const errorData = await verificationResponse.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error during verification:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setVerificationInProgress(false);
            setIsEmailVerificationOpen(false);
        }
    };
    const isFormValid = () => {
        return (
            formData.username.trim() &&
            formData.displayName.trim() &&
            formData.email.trim() &&
            formData.password.trim() &&
            formData.password === formData.confirmPassword &&
            formData.terms
        );
    };

    return (
        <div className="pageWrapper">
            <LeftPanel />
            <div className="rightPanel">
                <form onSubmit={handleSubmit} className="form">
                    <h2 className="formTitle">Register</h2>

                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="nguyenvana.deptrai"
                    />

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@student.hcmiu.edu.vn"
                    />

                    <InputField
                        label="Display Name"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        placeholder="Nguyen Van A"
                    />

                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />

                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                    />

                    <Checkbox
                        label="I agree to the terms and conditions"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                    />

                    <SubmitButton disabled={!isFormValid()} label="Register" />

                    <div className="loginLink">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </form>
                <EmailVerification
                    isOpen={isEmailVerificationOpen}
                    onClose={() => setIsEmailVerificationOpen(false)}
                    onVerify={handleVerificationComplete}
                    email={formData.email}
                />
            </div>
            <div className="gradient-bg">
                {/* mix color */}
                <svg xmlns="http://www.w3.org/2000/svg">
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

export default function Register() {
    return <RegisterForm />;
}
