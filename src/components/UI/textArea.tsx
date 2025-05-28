import type {  PropsWithChildren, TextareaHTMLAttributes } from "react"

type props = { label: string }
    & TextareaHTMLAttributes<HTMLTextAreaElement>
    & PropsWithChildren

export default function TextArea(props: props) {
    const { label } = props;
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...props}
            ></textarea>
            {props.children}
        </div>
    )
}