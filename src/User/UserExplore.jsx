import React, { useState } from 'react';
import '../App.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Spline from '@splinetool/react-spline';
import manaliImg from '../assets/Images/Manali.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import keralaImg from '../assets/Images/kerala.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import spitiImg from '../assets/Images/spiti.jpg';
import jaipImg from '../assets/Images/jaip.jpg';
import kedarkanImg from '../assets/Images/kedarkan.jpg';
import himacImg from '../assets/Images/himac.jpg';
import ziroImg from '../assets/Images/ziro.jpg';
import girImg from '../assets/Images/gir.jpeg';
import choptaImg from '../assets/Images/chopta.jpg';
import jawaiImg from '../assets/Images/jawai.jpg';
import addImg from '../assets/Images/add.jpg';

function UserExplore() {

  const travelAgencies = [
    {
      name: "From Hill's Manali",
      image: manaliImg,
      rating: "4.8",
      category: "TRAVEL AGENCY",
      subtitle: "Premium Manali tours with luxury accommodations"
    },
    {
      name: "Manali Tour And Travels",
      image: kashmirImg,
      rating: "4.6",
      category: "TRAVEL AGENCY",
      subtitle: "Complete Manali travel packages with local expertise"
    },
    {
      name: "Hillstrip",
      image: keralaImg,
      rating: "4.4",
      category: "TRAVEL AGENCY",
      subtitle: "Adventure tours and hill station experiences"
    },
    {
      name: "Sarvatrah DMC",
      image: goaImg,
      rating: "4.7",
      category: "TRAVEL AGENCY",
      subtitle: "Destination management with corporate travel solutions"
    },
    {
      name: "Sai Country Trips",
      image: spitiImg,
      rating: "4.5",
      category: "TRAVEL AGENCY",
      subtitle: "Spiritual and cultural journey experiences"
    },
    {
      name: "TravelOnEase",
      image: jaipImg,
      rating: "4.3",
      category: "TRAVEL AGENCY",
      subtitle: "Hassle-free travel planning and booking services"
    },
    {
      name: "Himalayan Frontiers",
      image: kedarkanImg,
      rating: "4.9",
      category: "TRAVEL AGENCY",
      subtitle: "Adventure tours in the mighty Himalayas"
    },
    {
      name: "Incredible Himachal Holidays",
      image: himacImg,
      rating: "4.6",
      category: "TRAVEL AGENCY",
      subtitle: "Complete Himachal Pradesh travel experiences"
    },
    {
      name: "Manali Leisure Travels",
      image: ziroImg,
      rating: "4.4",
      category: "TRAVEL AGENCY",
      subtitle: "Relaxing leisure tours in Manali region"
    },
    {
      name: "Royal Himalayan Holidays",
      image: girImg,
      rating: "4.8",
      category: "TRAVEL AGENCY",
      subtitle: "Luxury Himalayan travel experiences"
    },
    {
      name: "Travel Explorers Manali",
      image: choptaImg,
      rating: "4.5",
      category: "TRAVEL AGENCY",
      subtitle: "Exploration tours and trekking adventures"
    },
    {
      name: "Himalayan Destination",
      image: jawaiImg,
      rating: "4.7",
      category: "TRAVEL AGENCY",
      subtitle: "Comprehensive Himalayan destination packages"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header 
        onLoginClick={() => {}} // Empty function since UserExplore doesn't have login modals
        onSignupClick={() => {}} // Empty function since UserExplore doesn't have signup modals
      />

      {/* Breadcrumbs */}
     

      {/* Hero Section with Spline 3D */}
      <section className="relative h-96 bg-cover bg-center rounded-2xl overflow-hidden shadow-xl mx-4 md:mx-8 mt-20 mb-8">
        <div className="relative h-full flex items-center px-4 md:px-8">
          {/* Text Content */}
          <div className="text-white p-6 rounded-lg max-w-md z-10">
            <div className="text-sm uppercase tracking-wide mb-2 text-yellow-400">TRIPPNOVA COLLECTIONS</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Adventure Trips</h1>
           
            <div className="text-lg font-semibold">29 Agencies</div>
          </div>
        </div>
        
        {/* Spline 3D Component */}
        <div className="absolute inset-0 w-full h-full">
          <Spline
            scene="https://prod.spline.design/6WVIUEAZk9JJ6zII/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
         
          
        </div>
      </section>

      {/* Content Cards */}
      <section className="px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {travelAgencies.map((agency, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={agency.image} 
                  alt={agency.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {agency.category}
                </div>
                <div className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {agency.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{agency.name}</h3>
                <p className="text-sm text-gray-600">{agency.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default UserExplore;
