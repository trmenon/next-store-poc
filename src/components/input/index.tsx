"use client";
import React, { ChangeEvent } from "react";
import './Input.styles.css';

interface InputProps {
    name: string;
    value: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    onChange: (value: string, name: string)=> void;
}

export const Input: React.FC<InputProps> = ({
    name,
    value,
    type,
    label,
    placeholder,
    required,
    onChange,
})=> {
    const handleChange = (event: ChangeEvent<HTMLInputElement>)=> onChange(event.target.value, name);

    return(
        <div className="input">
            <div className="fieldset">
                <div className="input-label">
                    <label htmlFor={name}>{label}</label>
                </div>                
                <div className="input-field">
                    <input 
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        required={required}
                        onChange={handleChange}
                    />
                </div>                
            </div>
        </div>
    )
}