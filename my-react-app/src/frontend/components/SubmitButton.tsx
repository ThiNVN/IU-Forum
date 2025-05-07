import React from 'react';
import '../styles/register.css';

interface SubmitButtonProps {
  disabled: boolean;
  label: string;
  type?: "submit" | "button" | "reset";
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, label, type }) => (
  <button type="submit" disabled={disabled} className="submitButton">
    {label}
  </button>
);

export default SubmitButton;
