import React from 'react';
import '../styles/register.css';

interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder, required = true }) => (
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
            required={required}
        />
    </div>
);

export default InputField