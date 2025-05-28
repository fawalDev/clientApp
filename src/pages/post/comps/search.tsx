import useTwoWayBinding from "../../../hooks/useTwoWayBinding";

export default function Search() {
    const [value, onChangeValue] = useTwoWayBinding('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-4 justify-center my-4" >
            <input
                type="text"
                value={value}
                onChange={onChangeValue}
                className="border border-gray-300 rounded px-2 py-1 w-64"
                placeholder="I am new!"
            />
            <button className="text-purple-800 text-sm font-semibold"            >
                UPDATE
            </button>
        </form >
    );
}