import type { PropsWithChildren } from "react";

export default function Button(props: PropsWithChildren) {
    return (
        <button
            // onClick={onClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold py-1 px-4 rounded shadow"
        >        {props.children}
        </button>
    )
}