import React from 'react'

function TimeSelector({ value, onChange, label, className }) {
    let times = Array.from({ length: (24 * 4) }, (_, index) => {
        const hour = Math.floor(index / 4);
        const minutes = (index % 4) * 15;
        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });
    times = [...times, '23:59'];
    return (
        <div className="flex flex-col">
            <label className="mb-2 font-bold text-gray-700">{label}</label>
            <select 
                className={`form-select w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
                value={value} 
                onChange={onChange}>
                {times.map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            
        </div>
    );
}


export default TimeSelector
