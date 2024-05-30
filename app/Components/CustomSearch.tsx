import React, {useState, ChangeEvent} from 'react';

interface CustomSelectProps {
    options : any[];
    onChange : (selectedOption : string) => void;
}

function CustomSelect({options, onChange} : CustomSelectProps) {
    const [selectedOption,
        setSelectedOption] = useState('');

    const handleChange = (event : ChangeEvent < HTMLSelectElement >) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };
    return (
        <select
            value={selectedOption}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-emerald-700">
            {options.map((option, index) => (
                <option key={index} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default CustomSelect;