import React, { useState } from 'react';
import api from '../../conf/axiosConfig';

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
        <div className="p-4 bg-indigo-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      api.post('users/contact', {
        name: e.target[0].value,
        email: e.target[1].value,
        message: e.target[2].value,
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
    alert('Your message has been sent!');
  };

  const faqs = [
    { question: 'How can I reserve a parking spot in advance?', answer: 'You can reserve a parking spot by using the "Reserve" feature in our app. Simply select your desired location, choose the date and time, and confirm your reservation.' },
    { question: 'What payment methods are accepted?', answer: 'We accept various payment methods, including credit/debit cards and digital wallets such as PayPal and Apple Pay.' },
    { question: 'Is there a cancellation policy for reserved spots?', answer: 'Yes, you can cancel your reservation up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours of the reservation time are not eligible for a refund. Transaction fee cannot be refunded.' },
    { question: 'How do I find my reserved parking spot?', answer: 'Once your reservation is confirmed, you will receive detailed directions and a map to your reserved spot. You can also find this information in the "My Reservations" section of the app.' },
    { question: 'What should I do if I encounter a problem with my parking spot?', answer: 'If you encounter any issues, please contact our support team immediately through the app\'s "Contact" section or call our support number. We are here to assist you!' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h3 className='font-bold uppercase'>members</h3>
        <h1 className="text-5xl font-bold mb-4">We've been waiting for you.</h1>
        <p className="text-lg">We want to hear from you. Let us know how we can help.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Send us a Message</h2>
        <form className="space-y-4" 
        onSubmit={handleSubmit}
        >
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
            <textarea className="border p-2 w-full rounded" rows="4" />
          </div>
          <button type="submit" className="bg-indigo-600 text-white p-2 w-full rounded hover:bg-indigo-700">
            Submit
          </button>
        </form>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get in touch!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-purple-600 text-3xl mb-4">📞</span>
          <p>(+1) 226-975-6336</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <span className="text-purple-600 text-3xl mb-4">✉️</span>
          <p><a href="mailto:spotshare3@gmail.com">spotshare3@gmail.com</a></p>
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
