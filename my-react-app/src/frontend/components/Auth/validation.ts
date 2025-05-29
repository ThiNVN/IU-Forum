export interface ValidationField {
    isValid: boolean;
    message: string;
    isChecking?: boolean;
}

export interface ValidationState {
    username: ValidationField & { isChecking: boolean };
    email: ValidationField;
    password: ValidationField & {
        requirements: {
            length: boolean;
            uppercase: boolean;
            lowercase: boolean;
            number: boolean;
        };
    };
    confirmPassword: ValidationField;
}

export const initialValidationState: ValidationState = {
    username: {
        isValid: false,
        message: '',
        isChecking: false
    },
    email: {
        isValid: false,
        message: ''
    },
    password: {
        isValid: false,
        message: '',
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false
        }
    },
    confirmPassword: {
        isValid: false,
        message: ''
    }
}; 