import React from 'react';
import '../../styles/register.css';

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    type?: string;
    placeholder?: string;
    error?: string;
    isLoading?: boolean;
    required?: boolean;
    readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    isFocused,
    type = 'text',
    placeholder,
    error,
    isLoading,
    required,
    readOnly
}) => {
    return (
        <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
            <label htmlFor={name}>{label}</label>
            <div className="input-container">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`inputField ${error ? 'register-error' : ''}`}
                    required={required}
                    readOnly={readOnly}
                />
                {/* {isLoading && <div className="loading-spinner" />} */}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputField;