import React, { useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import InputField from '../components/InputField';
import Checkbox from '../components/Checkbox';
import SubmitButton from '../components/SubmitButton';
import '../styles/register.css';
import '../styles/gradientbg.scss'

const InteractiveBubble: React.FC = () => {
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move () {
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

interface RegisterFormData{
    username: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}
const App: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill in all information correctly!');
        }
        console.log('Registered', formData);
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
        <div>
    <div className="container">
        <div className='card'>
            <form action="#" onSubmit={handleSubmit} className='form'>
                <h2 className='title'>Register</h2>

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
                placeholder='example@student.hcmiu.edu.vn'
                />

                <InputField
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder='Nguyen Van A'
                />

                <InputField
                label = "Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder='vana@123'
                />

                <InputField
                label = "Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder='vana@123'
                />
                <Checkbox
                label = "I agree to the terms and conditions"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                />
                <SubmitButton disabled={!isFormValid()} label="Register" />
            </form>
        </div>
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
export default function Register() {
    return (
        <div>
            <App />
        </div>
    );
}
