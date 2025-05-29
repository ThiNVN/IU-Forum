import React from 'react';
import '../../styles/register.css';

interface SubmitButtonProps {
  disabled?: boolean;
  label: string;
  type?: 'submit' | 'button';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  disabled = false, 
  label,
  type = 'submit'
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`submit-button ${disabled ? 'disabled' : ''}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
