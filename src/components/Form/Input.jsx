import React from 'react';

function InputField({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
    />
  );
}

export default InputField;
