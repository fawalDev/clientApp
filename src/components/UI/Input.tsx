import type { InputHTMLAttributes, PropsWithChildren } from "react"



type props = { label: string }
    & InputHTMLAttributes<HTMLInputElement>
    & PropsWithChildren

export default function Input(props: props) {
    const { label } = props;
    const restProps = { ...props, children: null };
    return (
        <div className="mb-4">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input id={label} className={props.className || `w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                {...restProps} />
            {props.children}
        </div>
    )
}