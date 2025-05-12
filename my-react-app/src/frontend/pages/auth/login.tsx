// Suggested code may be subject to a license. Learn more: ~LicenseLog:277995103.
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import InputField from '../../components/InputField';
import Checkbox from '../../components/Checkbox';
import SubmitButton from '../../components/SubmitButton';
import LeftPanel from '../../components/LeftPanel';
import '../../styles/register.css';
import '../../styles/gradientbg.scss'
import { Link, useNavigate } from 'react-router-dom';

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
    const [formData, setFormData] = useState<LoginFormData>({
        userIdentifier: '',
        password: '',
    });
    const [identifierType, setIdentifierType] = useState<'email' | 'username' | null>(null);
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

                if (response.ok) {
                    const result = await response.json();
                    if (result.userId) {
                        // Set userId in sessionStorage
                        sessionStorage.setItem('userId', result.userId);
                        // Redirect to main page
                        navigate('/main');
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

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!isFormValid()) {
    //         alert('Please fill in all information correctly!');
    //     }
    //     console.log('Registered', formData);
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill in all information correctly!');
            return;
        }

        try {
            // Sending data to the backend using fetch
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    identifierType,
                }),
                credentials: 'include' // Add this to send/receive cookies
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                sessionStorage.setItem('userId', result.userId);
                setTimeout(() => {
                    window.location.href = "/main";
                }, 1000); // 1 second delay
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("Something went wrong. Please try again.");
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

// export { App, InteractiveBubble };
export default function Login() {
    return (
        <div>
            <App />
        </div>
    );
}
