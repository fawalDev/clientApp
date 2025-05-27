import React, { type PropsWithChildren } from 'react';


interface props extends
    PropsWithChildren,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string,
    value: string,
    isRed?: boolean,
}

export default function Input({ label, type, value, onChange, name, isRed = false, children }: props) {
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
            {children}
        </div>
    );
}
