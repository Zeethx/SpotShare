import React from "react";

const FormField = ({ label, name, value, onChange, type = "text", disabled = false }) => (
  <div className="mb-4">
    <label className="text-xl font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border p-2 w-full ${disabled ? 'bg-gray-200' : 'bg-white'}`}
    />
  </div>
);

export default FormField;
