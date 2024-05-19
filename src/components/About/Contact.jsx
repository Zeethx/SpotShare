import React from 'react';

const Contact = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4">If you have any questions, feedback, or inquiries, please feel free to reach out to us. We’d love to hear from you!</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Email</h2>
        <p className="mb-4">You can email us at: <a href="mailto:support@spotshare.com" className="text-blue-600 underline">support@spotshare.com</a></p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Phone</h2>
        <p className="mb-4">Call us at: (123) 456-7890</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Address</h2>
        <p className="mb-4">123 SpotShare Lane<br />
        Toronto, ON<br />
        Canada</p>
      </div>
    </div>
  );
};

export default Contact;
