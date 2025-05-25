import React from 'react';
import '../styles/register.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
    <div className='inputGroup'>
        <label htmlFor={props.name} className='label'>{label}</label>
        <input
            {...props}
            className='inputField'
        />
    </div>
);

export default InputField;