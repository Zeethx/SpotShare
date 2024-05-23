import React from "react";

const FormTextArea = ({ label, name, value, onChange, disabled = false }) => (
  <div className="mb-4">
    <label className="text-xl font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border p-2 w-full ${disabled ? 'bg-gray-200' : 'bg-white'}`}
    />
  </div>
);

export default FormTextArea;
