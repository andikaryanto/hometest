export default function Select({ options, value, className, key, displayKey, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 ${className}`}
        >
            {options && options.map((option) => (
                <option key={option[key]} value={option[key]}>
                    {option[displayKey]}
                </option>
            ))}
        </select>
    );
};