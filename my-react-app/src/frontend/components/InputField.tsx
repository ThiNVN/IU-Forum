import React from 'react';
import '../styles/register.css';

interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder }) => (
    <div className='inputGroup'>
        <label htmlFor={name} className='label'>{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='inputField'
        />
    </div>
);

export default InputField