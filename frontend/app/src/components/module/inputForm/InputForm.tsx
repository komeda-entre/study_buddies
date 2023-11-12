import React, { useState } from "react";
import FlashMessage from '../FlashMessage/FlashMessage';

import './InputForm.css';

interface InputFormProps {
    name: string;
    labelName: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    successMessage?: string;
    type?: string;
}

const InputForm: React.FC<InputFormProps> = ({ name, labelName, value, onChange, errorMessage, type }) => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    }

    return (
        <React.Fragment>
            <label htmlFor={name}>{labelName}</label>
            <div className="input-wrapper">
                <input
                    type={isRevealPassword ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {type === 'password' && (
                    <span
                        onClick={togglePassword}
                        role="presentation"
                        className="PasswordReveal"
                    >
                        {isRevealPassword ? (
                            <i className="fas fa-eye" />
                        ) : (
                            <i className="fas fa-eye-slash" />
                        )}
                    </span>
                )}
            </div>
            <FlashMessage
                errorMessage={errorMessage}
            />
        </React.Fragment>
    )
}

export default InputForm;
