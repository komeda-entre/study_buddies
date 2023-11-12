// FlashMessage.tsx
import React from 'react'
import './FlashMessage.css';

interface FlashMessageProps {
    errorMessage?: string; 
}

const FlashMessage: React.FC<FlashMessageProps> = ({ errorMessage }) => {
    return (
        <React.Fragment>
            <p className="errors">{errorMessage}</p> 
        </React.Fragment>
    )
}

export default FlashMessage;
