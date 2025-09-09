import React from 'react';
import addImg from '../assets/Images/add.jpg';
import Footer from './Footer';

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
            <div className="text-sm text-gray-500">Discover the World with Us</div>
          </div>
        </div>
      </header>

      {/* Banner Image */}
      <div 
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${addImg})` }}
      >
        <div className="relative z-10 text-center text-white">
          {/* Main Title */}
          <h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin tracking-widest uppercase mb-2 sm:mb-4 text-center"
            style={{
              background: 'linear-gradient(to right, #ffe680, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 230, 128, 0.3)'
            }}
          >
            TRIPPNOVA
          </h2>
          
          {/* Separator Line */}
          <div className="w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 h-px bg-white mb-2 sm:mb-4"></div>
          
          {/* Tagline */}
          <p 
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide uppercase text-center mb-4 sm:mb-6 md:mb-8 px-2 max-w-xs sm:max-w-md md:max-w-lg"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.2)'
            }}
          >
            DISCOVER THE WORLD WITH US
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Introduction */}
        <div className="mb-12">
          <h3 
            className="text-4xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            About Trippnova
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">
            Trippnova is an innovative travel platform designed to revolutionise the way people plan and book their trips. Our mission is to provide a seamless and personalized travel experience by connecting customers with the best travel options tailored to their budget, preferences, and interests. Whether you're looking for a luxurious getaway, a budget-friendly adventure, or a family-friendly vacation, Trippnova ensures you find the perfect trip.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h3 
            className="text-3xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Key Features
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Personalized Trip Recommendations</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our advanced search and filtering tools help customers find trips that match their budget, preferences, and travel goals.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-600 text-xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Wide Range of Options</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                From flights and hotels to tour packages and activities, we offer a comprehensive selection of travel services.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">User-Friendly Interface</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our intuitive platform makes it easy for customers to explore, compare, and book their dream trips.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-orange-600 text-xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Customer Reviews and Ratings</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Travelers can share their experiences and read feedback from others to make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-12">
          <h3 
            className="text-3xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Our Vision
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            At Trippnova, we believe that everyone deserves to explore the world, regardless of their budget or travel style. Our vision is to become the go-to platform for travellers and travel providers alike, fostering a global community of adventurers and creating unforgettable travel experiences.
          </p>
        </div>

        {/* Platform Description */}
        <div className="mb-12">
          <h3 
            className="text-3xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            How Trippnova Works
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <p className="text-base text-gray-700 leading-relaxed">
              Trippnova is the platform that works like a bridge between customer and consumer like onboarding all the travel companies with their itinerary and all pricing where customers can compare with the others travel agency and book their trips on our website and application according to their budget and preferences. Where they can get national and International trips and Pilgrims.
            </p>
          </div>
        </div>

        {/* Join Us */}
        <div className="mb-12">
          <h3 
            className="text-3xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Join Us
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Whether you're a traveler looking for your next adventure or a travel agency seeking to expand your reach, Trippnova is here to make your journey easier and more enjoyable. Discover the world with us today!
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-lg mb-6">
            Join thousands of travelers who trust Trippnova for their perfect trips.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Exploring
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
