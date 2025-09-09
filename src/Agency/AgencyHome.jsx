import React, { useState } from 'react';
import addImg from '../assets/Images/add.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

function AgencyHome() {
  const navigate = useNavigate();
  // FAQ state for open/close
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqs = [
    {
      q: 'What documents and details are required to register as a travel agency on Trippnova?',
      a: 'You will need your PAN card, GST number (if applicable), bank account details, travel agency license, business profile image/logo, and owner/director ID proof.'
    },
    {
      q: 'How long does it take for my agency to go live after submitting the documents?',
      a: 'Once all documents are verified, your agency can go live within 2-3 business days.'
    },
    {
      q: 'Is there any onboarding or registration fee for agencies?',
      a: 'Trippnova offers 0% commission for the first month for new partners. There are no hidden onboarding fees.'
    },
    {
      q: 'How can I get help and support from Trippnova if I face any issues?',
      a: 'You can reach out to our support team at agencyonboarding@trippnova.com for any assistance during onboarding or later.'
    },
    {
      q: 'How much commission will be charged by Trippnova?',
      a: 'Our commission structure is transparent and competitive. Details will be shared during onboarding and are available on request.'
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 w-full">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-700 mb-2 sm:mb-0">trippnova</span>
        <button className="px-4 sm:px-6 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition text-sm sm:text-base" onClick={() => navigate('/AgencyLandingPage')}>Login</button>
      </header>
      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full">
        {/* Hero Section with Background Image */}
        <div className="relative w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 overflow-hidden min-h-[340px] sm:min-h-[420px]">
          <img
            src={addImg}
            alt="Register your agency background"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            style={{ filter: 'brightness(0.65) blur(1px)' }}
          />
          <div className="absolute inset-0 bg-white/70 z-10" />
          <div className="relative z-20 flex flex-col items-center w-full max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-center text-gray-900 mb-3 sm:mb-4 drop-shadow-lg">Partner with Trippnova<br className="hidden sm:block"/>and grow your travel business</h1>
            
            <button
              className="mt-2 sm:mt-4 px-56 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white text-base sm:text-lg font-bold rounded-lg shadow hover:brightness-110 transition w-full max-w-xs sm:max-w-fit"
              onClick={() => navigate('/AgencyRegistration')}
            >Register your agency</button>
          </div>
        </div>
        {/* White Card Checklist */}
        <div className="w-full flex justify-center mt-6 sm:mt-8 px-2">
          <div className="bg-white rounded-2xl shadow-md px-4 sm:px-8 py-6 sm:py-8 max-w-lg sm:max-w-3xl w-full flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h2 className="text-lg sm:text-2xl font-bold mb-2">Get Started - It only takes 10 minutes</h2>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">Please keep these documents and details ready for a smooth sign-up</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 text-gray-800 text-sm sm:text-base">
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>PAN card</div>
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>GST number, if applicable</div>
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>Bank account details</div>
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>Travel agency license</div>
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>Business profile image/logo</div>
                <div className="flex items-center gap-2"><span className="text-green-600 text-xl">✔</span>Owner/Director ID proof</div>
              </div>
            </div>
          </div>
        </div>
        {/* Why Partner Section */}
        <section className="w-full flex justify-center mt-12 sm:mt-20 mb-8 px-2 sm:px-4">
          <div className="max-w-2xl sm:max-w-5xl w-full">
            <div className="flex flex-col sm:flex-row items-center mb-8 sm:mb-12">
              <div className="flex-1 border-t border-gray-300 hidden sm:block" />
              <h2 className="mx-0 sm:mx-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 whitespace-nowrap py-2">Why should you partner with Trippnova?</h2>
              <div className="flex-1 border-t border-gray-300 hidden sm:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 text-center">
              {/* Attract new customers */}
              <div className="flex flex-col items-center px-2">
                <span className="mb-4">
                  {/* Users Icon */}
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" stroke="#2563eb" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M23 20v-2a4 4 0 00-3-3.87" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 010 7.75" /></svg>
                </span>
                <div className="font-bold text-base sm:text-xl mb-2 text-gray-800">Attract new travelers</div>
                <div className="text-gray-500 text-sm sm:text-base">Reach thousands of travel seekers booking on Trippnova</div>
              </div>
              {/* Doorstep delivery convenience */}
              <div className="flex flex-col items-center px-2">
                <span className="mb-4">
                  {/* Suitcase Icon */}
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#2563eb" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a4 4 0 00-8 0v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 11v2m4-2v2m4-2v2" /></svg>
                </span>
                <div className="font-bold text-base sm:text-xl mb-2 text-gray-800">Seamless booking experience</div>
                <div className="text-gray-500 text-sm sm:text-base">Easily manage and receive bookings through our platform</div>
              </div>
              {/* Onboarding support */}
              <div className="flex flex-col items-center px-2">
                <span className="mb-4">
                  {/* Mail Icon */}
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#2563eb" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" /></svg>
                </span>
                <div className="font-bold text-base sm:text-xl mb-2 text-gray-800">Onboarding support</div>
                <div className="text-gray-500 text-sm sm:text-base">For any support, email us at <span className="underline">agencyonboarding@trippnova.com</span></div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="w-full flex justify-center mt-12 sm:mt-20 mb-10 sm:mb-16 px-2 sm:px-4">
          <div className="max-w-md sm:max-w-3xl w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-6 sm:mb-10">Frequently asked questions</h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow transition">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-base sm:text-lg font-semibold text-gray-800 focus:outline-none hover:bg-gray-50 transition"
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  >
                    <span className="text-left">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gray-300 transform transition-transform duration-200 ${openFAQ === idx ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === idx && (
                    <div className="px-6 pb-5 text-gray-600 text-base border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AgencyHome;
