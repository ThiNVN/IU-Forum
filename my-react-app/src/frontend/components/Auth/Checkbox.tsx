import React from 'react';
import '../../styles/register.css';

interface CheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, checked, onChange }) => (
    <div className="checkboxGroup">
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className="checkboxInput"
        />
        <label htmlFor={name} className="checkboxLabel">{label}</label>
    </div>
);

export default Checkbox;
