import React from 'react';

interface props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
 {
    label: string,
    value: string,
    isRed?: boolean,
}

export default function Input({ label, type, value, onChange, name, isRed= false}: props) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm text-gray-700 mb-1">{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border  p-2 rounded outline-none ${isRed ? 'border-red-300 bg-red-100' : ''}`}
            />
        </div>
    );
}
