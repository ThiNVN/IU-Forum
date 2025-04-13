import React from 'react';
import '../styles/register.css';

interface SubmitButtonProps {
  disabled: boolean;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, label }) => (
  <button type="submit" disabled={disabled} className="submitButton">
    {label}
  </button>
);

export default SubmitButton;
