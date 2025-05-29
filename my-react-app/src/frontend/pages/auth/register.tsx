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
import { ValidationState, initialValidationState } from '../../components/Auth/validation';

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

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [validation, setValidation] = useState<ValidationState>(initialValidationState);
    const usernameCheckTimeout = useRef<ReturnType<typeof setTimeout>>(null);

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const checkUsernameAvailability = async (username: string) => {
        // Reset validation state at the start
        setValidation(prev => ({
            ...prev,
            username: {
                isValid: false,
                message: '',
                isChecking: true
            }
        }));

        if (!username.trim()) {
            setValidation(prev => ({
                ...prev,
                username: {
                    isValid: false,
                    message: 'Username is required',
                    isChecking: false
                }
            }));
            return;
        }

        // Username format validation
        const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
        if (!usernameRegex.test(username)) {
            setValidation(prev => ({
                ...prev,
                username: {
                    isValid: false,
                    message: 'Username must be 3-20 characters and can only contain letters, numbers, dots, and underscores',
                    isChecking: false
                }
            }));
            return;
        }

        try {
            const response = await fetch(`https://localhost:8081/api/check-username/${username}`);
            const data = await response.json();
            // print data
            console.log('Username check response:', data);
            /*
            if(!response.ok){
                throw new Error(data.message || 'Error checking username');
            }
            */
            
            setValidation(prev => ({
                ...prev,
                username: {
                /*
                isValid: data.available,
                message: data.message,
                */
                    isValid: true,
                    message: 'Username is available',
                    isChecking: false
                }
            }));
        } catch (error) {
            console.error('Error checking username:', error);
            setValidation(prev => ({
                ...prev,
                username: {
                    isValid: false,
                    message: error instanceof Error ? error.message : 'Error checking username availability',
                    isChecking: false
                }
            }));
        }
    };

    // Add debouncing to prevent too many API calls
    const debouncedCheckUsername = (username: string) => {
        if (usernameCheckTimeout.current) {
            clearTimeout(usernameCheckTimeout.current);
        }
        usernameCheckTimeout.current = setTimeout(() => {
            checkUsernameAvailability(username);
        }, 500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Validate on input change
        switch (name) {
            case 'username':
                debouncedCheckUsername(value);
                break;
            case 'email':
                validateEmail(value);
                break;
            case 'password':
                validatePassword(value);
                break;
            case 'confirmPassword':
                validateConfirmPassword(value);
                break;
        }
    };

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (usernameCheckTimeout.current) {
                clearTimeout(usernameCheckTimeout.current);
            }
        };
    }, []); // Empty dependency array since we only want this to run on mount/unmount

    const validateEmail = (email: string) => {
        const isValid = email.endsWith('hcmiu.edu.vn');
        setValidation(prev => ({
            ...prev,
            email: {
                isValid,
                message: isValid ? '' : 'Email must end with hcmiu.edu.vn'
            }
        }));
    };

    const validatePassword = (password: string) => {
        const requirements = {
            length: password.length >= 8 && password.length <= 16,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        };

        const isValid = Object.values(requirements).every(Boolean);

        setValidation(prev => ({
            ...prev,
            password: {
                isValid,
                message: isValid ? '' : 'Password does not meet requirements',
                requirements
            }
        }));

        // Also validate confirm password when password changes
        if (formData.confirmPassword) {
            validateConfirmPassword(formData.confirmPassword, password);
        }
    };

    const validateConfirmPassword = (confirmPassword: string, password: string = formData.password) => {
        const isValid = confirmPassword === password;
        setValidation(prev => ({
            ...prev,
            confirmPassword: {
                isValid,
                message: isValid ? '' : 'Passwords do not match'
            }
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
        const validationResult = (
            formData.username.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.displayName.trim() !== '' &&
            formData.password.trim() !== '' &&
            formData.confirmPassword.trim() !== '' &&
            formData.terms &&
            validation.username.isValid === true && // Explicit check
            validation.email.isValid === true &&
            validation.password.isValid === true &&
            validation.confirmPassword.isValid === true &&
            !validation.username.isChecking
        );

        console.log('Form Data:', formData);
        console.log('Validation State:', validation);
        console.log('Form Valid:', validationResult);

        return validationResult;
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
                        onFocus={() => handleFocus('username')}
                        onBlur={handleBlur}
                        isFocused={focusedField === 'username'}
                        placeholder="nguyenvana.deptrai"
                        error={validation.username.message}
                        isLoading={validation.username.isChecking}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        isFocused={focusedField === 'email'}
                        placeholder="example@student.hcmiu.edu.vn"
                        error={validation.email.message}
                    />

                    <InputField
                        label="Display Name"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('displayName')}
                        onBlur={handleBlur}
                        isFocused={focusedField === 'displayName'}
                        placeholder="Nguyen Van A"
                    />

                    <div className={`password-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                            isFocused={focusedField === 'password'}
                            placeholder="••••••••"
                        />
                        <div className="password-requirements">
                            <div className={`requirement ${validation.password.requirements.length ? 'met' : ''}`}>
                                • 8-16 characters
                            </div>
                            <div className={`requirement ${validation.password.requirements.uppercase ? 'met' : ''}`}>
                                • At least one uppercase letter
                            </div>
                            <div className={`requirement ${validation.password.requirements.lowercase ? 'met' : ''}`}>
                                • At least one lowercase letter
                            </div>
                            <div className={`requirement ${validation.password.requirements.number ? 'met' : ''}`}>
                                • At least one number
                            </div>
                        </div>
                    </div>

                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('confirmPassword')}
                        onBlur={handleBlur}
                        isFocused={focusedField === 'confirmPassword'}
                        placeholder="••••••••"
                        error={validation.confirmPassword.message}
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
