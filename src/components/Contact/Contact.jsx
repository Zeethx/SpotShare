import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left p-4 text-lg font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-yellow-100">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const faqs = [
    { question: 'Lorem ipsum dolor sit amet?', answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.' },
    { question: 'Lorem ipsum dolor sit amet?', answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.' },
    { question: 'Lorem ipsum dolor sit amet?', answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.' },
    { question: 'Lorem ipsum dolor sit amet?', answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">We've been waiting for you.</h1>
        <p className="text-xl">We want to hear from you. Let us know how we can help.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Send us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter your name</label>
            <input type="text" className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Enter your email</label>
            <input type="email" className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <input type="text" className="border p-2 w-full rounded" />
          </div>
          <button type="submit" className="bg-indigo-600 text-white p-2 w-full rounded hover:bg-indigo-700">
            Submit
          </button>
        </form>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Come and visit our offices around the world</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-purple-600 text-3xl mb-4">📞</span>
          <p>(+1) 226-975-6336</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-purple-600 text-3xl mb-4">✉️</span>
          <p>spotshare3@gmail.com</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-yellow-600 text-3xl mb-4">📍</span>
          <p>Windsor, ON</p>
        </div>
      </div>

      <div className="max-w-4xl w-full mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Some of the most frequently asked questions</h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Contact;
