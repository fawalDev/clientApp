import type React from 'react'

type props = {
    isBgWhite?: boolean
}

export default function Button({ value, children, type, className, onClick, isBgWhite = false }
    : React.ButtonHTMLAttributes<HTMLButtonElement> & props) {
    const baseClass = `border border-teal-700 py-2 px-20 rounded mt-4 cursor-pointer transition-all duration-200 ease-in-out`
    const bgClass = isBgWhite
        ? 'bg-white text-yellow-700 hover:bg-yellow-800 hover:text-white'
        : 'bg-yellow-400 hover:bg-yellow-500'

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClass} ${bgClass} ${className ?? ''}`}
        >
            {value ?? children ?? 'send'}
        </button>
    )
}
