import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Spline from '@splinetool/react-spline';
import Login from '../Components/Login';
import CreateNew from '../Components/CreateNew';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FamilySVG from '../assets/svg/family';
import BeachSVG from '../assets/svg/Beach';
import WeekendSVG from '../assets/svg/Weekend';
import AdventureSVG from '../assets/svg/adventure';
import HoneymoonSVG from '../assets/svg/Honeymoon';
import PilgrimageSVG from '../assets/svg/Pilgrimage';
import manaliImg from '../assets/Images/Manali.jpg';
import keralaImg from '../assets/Images/kerala.jpg';
import kedarkanImg from '../assets/Images/kedarkan.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import groupImg from '../assets/Images/group.jpg';
import honeymoonImg from '../assets/Images/honeymoon.jpg';
import adventureImg from '../assets/Images/adventure.jpg';
import holidaysImg from '../assets/Images/holidays.jpg';
import himacImg from '../assets/Images/himac.jpg';
import jaipImg from '../assets/Images/jaip.jpg';
import spitiImg from '../assets/Images/spiti.jpg';
import ziroImg from '../assets/Images/ziro.jpg';
import girImg from '../assets/Images/gir.jpeg';
import choptaImg from '../assets/Images/chopta.jpg';
import jawaiImg from '../assets/Images/jawai.jpg';
import logoImg from '../assets/Images/logo.png';
import roadImg from '../assets/Images/road.jpg';
import bikeImg from '../assets/Images/bike.jpg';
import addImg from '../assets/Images/add.jpg';
import fourByFourImg from '../assets/Images/four.jpg';
import TravelIcon from '../assets/animatedicons/travel';
import SupportIcon from '../assets/animatedicons/suport';
import DealsIcon from '../assets/animatedicons/deals';
import WalletIcon from '../assets/animatedicons/wallet';
import FamilyIcon from '../assets/animatedicons/Family';
import BeachIcon from '../assets/animatedicons/Beach';
import AdventureIcon from '../assets/animatedicons/adventure';
import HoneymoonIcon from '../assets/animatedicons/Honeymoon';
import PilgrimageIcon from '../assets/animatedicons/pilgrimage';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  // Trending destinations - removed auto-scroll logic
  const trendingRef = useRef(null);
  const cardWidth = 240; // width + gap
  const destinations = [
    { img: manaliImg, label: 'Manali' },
    { img: keralaImg, label: 'Kerala' },
    { img: kedarkanImg, label: 'Kedarkantha' },
    { img: kashmirImg, label: 'Kashmir' },
    { img: goaImg, label: 'Goa' },
    { img: jaipImg, label: 'Jaipur' },
    { img: spitiImg, label: 'Spiti Valley' },
  ];
  // Add this state to the Home component:
  const [dealsHover, setDealsHover] = useState([false, false, false, false, false, false]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Aniruddh');
  const navigate = useNavigate();

  const handleLoginSuccess = (loginState = true) => {
    if (loginState === false) {
      // Logout
      setIsLoggedIn(false);
    } else {
      // Login
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  // THEME CAROUSEL AUTO-SCROLL
  const themeCarouselRef = useRef(null);
  // Remove themeAutoScroll and themeAutoScrollTimeout state and useEffect
  // Remove useEffect(() => { ... }, [themeAutoScroll]) for themeCarouselRef
  // Remove themeAutoScrollTimeout ref
  // Remove any setInterval for themeCarouselRef auto-scroll
  // Keep manual scroll and arrow button logic unchanged

  const handleThemeUserEngage = () => {
    // setThemeAutoScroll(false); // This line is removed
    if (themeCarouselRef.current) { // This line is removed
      // setThemeAutoScroll(true); // This line is removed
    }
  };

  const handleUserEngage = () => {
    // Auto-scroll functionality removed
  };

  const scrollByCard = (dir) => {
    const trending = trendingRef.current;
    if (!trending) return;
    const scrollAmount = window.innerWidth < 768 ? 200 : cardWidth;
    if (dir === 'left') {
      trending.scrollLeft -= scrollAmount;
    } else {
      trending.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme carousel seamless loop: on mount, set scrollLeft to start of first set
  useEffect(() => {
    const carousel = themeCarouselRef.current;
    if (!carousel) return;
    const singleListWidth = carousel.scrollWidth / 2;
    carousel.scrollLeft = singleListWidth;
  }, []);

  // Theme carousel seamless loop: during auto-scroll, reset scrollLeft if at end
  // This useEffect is no longer needed as auto-scroll is removed
  // useEffect(() => {
  //   const carousel = themeCarouselRef.current;
  //   if (!carousel) return;
  //   let scrollStep = 4; // Increased speed
  //   let scrollInterval;
  //   if (themeAutoScroll) { // This line is removed
  //     scrollInterval = setInterval(() => {
  //       const singleListWidth = carousel.scrollWidth / 2;
  //       if (carousel.scrollLeft >= singleListWidth * 2) {
  //         carousel.scrollLeft = carousel.scrollLeft - singleListWidth;
  //       } else if (carousel.scrollLeft <= 0) {
  //         carousel.scrollLeft = singleListWidth;
  //       } else {
  //         carousel.scrollLeft += scrollStep;
  //       }
  //     }, 20); // Faster interval
  //   }
  //   return () => clearInterval(scrollInterval);
  // }, [themeAutoScroll]); // This line is removed

  // Hidden Gems Carousel State
  const hiddenGems = [
    { name: 'Ziro Valley', state: 'Arunachal Pradesh', img: ziroImg },
    { name: 'Spiti Valley', state: 'Himachal Pradesh', img: spitiImg },
    { name: 'Gir', state: 'Gujarat', img: girImg },
    { name: 'Chopta', state: 'Uttarakhand', img: choptaImg },
    { name: 'Jawai', state: 'Rajasthan', img: jawaiImg },
  ];
  const [hiddenGemIdx, setHiddenGemIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHiddenGemIdx(idx => (idx + 1) % hiddenGems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hiddenGems.length]);

  // Hero Image Carousel State
  const heroImages = [
    himacImg,
    kashmirImg,
    jaipImg,
    spitiImg,
  ];
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImgIdx(idx => (idx + 1) % heroImages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [heroImages.length]);



  // Organised by Trippnova cards
  const organisedCards = [
    { title: 'Road Trips', img: roadImg },
    { title: 'Bikers Group', img: bikeImg },
    { title: '4*4', img: fourByFourImg },
    { title: 'Adventure Trip', img: addImg },
  ];

  return (
    <div className="min-h-screen pt-[60px] bg-white">
      {/* Header Component */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Hero Section with Spline 3D */}
      <section className="w-full h-screen bg-transparent relative">
        <Spline
          scene="https://prod.spline.design/M7wkkObA0X8glgTZ/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none px-2 sm:px-4">
          {/* Main Title */}
          <h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin tracking-widest uppercase mb-2 sm:mb-4 text-center pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #ffe680, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 230, 128, 0.3)'
            }}
          >
            TRIPPNOVA
          </h1>
          
          {/* Separator Line */}
          <div className="w-16 xs:w-20 sm:w-24 md:w-28 lg:w-32 h-px bg-white mb-2 sm:mb-4 pointer-events-none"></div>
          
          {/* Tagline */}
          <p 
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide uppercase text-center mb-4 sm:mb-6 md:mb-8 pointer-events-none px-2 max-w-xs sm:max-w-md md:max-w-lg"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.2)'
            }}
          >
            BEYOND ITINERARIES. INTO EXPERIENCES.
          </p>
          
          {/* Call to Action Button */}
          <button 
            className="px-4 xs:px-5 sm:px-6 md:px-8 py-2 md:py-3 border border-white rounded-full text-white font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto text-xs xs:text-sm sm:text-base"
            onClick={() => {
              const element = document.querySelector('[data-section="organised-by-trippnova"]');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            EXPLORE
          </button>
        </div>
      </section>

      {/* Organised by Trippnova Section (match Top Trending Destinations style) */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 py-4 md:py-8 relative" data-section="organised-by-trippnova">
        <div className="text-center mb-6 xs:mb-8 sm:mb-8 md:mb-12">
          <h2 
            className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold relative inline-block mb-3 xs:mb-4"
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
            Curated Journeys by Trippnova
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Where Journeys Begin, Beyond the Map.
          </p>
        </div>
        <div className="flex gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto scroll-smooth pb-2 scrollbar-hide flex-nowrap justify-start md:justify-center">
          {organisedCards.map((card, idx) => (
            <div
              key={card.title}
              className="flex flex-col items-center w-[140px] xs:w-[160px] sm:w-[180px] md:w-[220px] lg:w-[260px] flex-shrink-0 select-none cursor-pointer"
              onClick={() => navigate('/userexplore')}
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-[120px] h-[120px] xs:w-[140px] xs:h-[140px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] rounded-2xl xs:rounded-3xl object-cover mb-3 xs:mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <span className="font-bold text-sm xs:text-base sm:text-lg md:text-xl mt-1 text-center px-1">{card.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Trending Destinations Section */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 py-4 md:py-8 relative">
        <div className="text-center mb-6 xs:mb-8 sm:mb-8 md:mb-12">
          <h2 
            className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold relative inline-block mb-3 xs:mb-4"
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
            Top Trending Destinations
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Explore the hottest travel spots around the globe.
          </p>
        </div>
        {/* Left Arrow */}
        <button
          onClick={() => scrollByCard('left')}
          className="absolute left-1 xs:left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-lg xs:text-xl sm:text-xl md:text-2xl text-purple-700">{'←'}</span>
        </button>
        {/* Right Arrow */}
        <button
          onClick={() => scrollByCard('right')}
          className="absolute right-1 xs:right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-lg xs:text-xl sm:text-xl md:text-2xl text-purple-700">{'→'}</span>
        </button>
        <div
          ref={trendingRef}
          className="flex gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto scroll-smooth pb-2 scrollbar-hide flex-nowrap px-8 xs:px-10 sm:px-0"
        >
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] flex-shrink-0 select-none cursor-pointer"
              onClick={() => navigate('/userexplore')}
            >
              <img
                src={dest.img}
                alt={dest.label}
                className="w-[120px] h-[120px] xs:w-[140px] xs:h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-2xl xs:rounded-3xl object-cover mb-3 xs:mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <span className="font-bold text-sm xs:text-base sm:text-lg md:text-xl mt-1 text-center px-1">{dest.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals You Can't Miss Section */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 pt-4 md:pt-8 pb-0">
        <div className="text-center mb-6 xs:mb-8 sm:mb-8 md:mb-12">
          <h2 
            className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold relative inline-block mb-3 xs:mb-4"
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
            Deals You Can't Miss
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Travel beyond boundaries with incredible savings
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-3 xs:gap-4 sm:gap-6 md:gap-8 justify-center">
          {/* Kashmir */}
          <div className="relative rounded-2xl overflow-hidden min-h-[180px] xs:min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 0 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 0 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={kashmirImg} alt="Kashmir" className={`w-full h-full object-cover min-h-[180px] xs:min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[0] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-3 xs:left-4 md:left-6 bottom-3 xs:bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-base xs:text-lg md:text-2xl tracking-wide">KASHMIR</div>
              <div className="text-xs xs:text-sm md:text-base mt-0.5">5 Nights / 6 Days</div>
            </div>
          </div>
          {/* Shimla (tall card) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[500px] shadow-lg col-span-1 row-span-2 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 1 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 1 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={himacImg} alt="Shimla" className={`w-full h-full object-cover min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[500px] transition-transform duration-300 will-change-transform ${dealsHover[1] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-3 xs:left-4 md:left-6 bottom-3 xs:bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-base xs:text-lg md:text-2xl tracking-wide">Shimla</div>
              <div className="text-xs xs:text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Goa (index 2) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[180px] xs:min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 2 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 2 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={goaImg} alt="Goa" className={`w-full h-full object-cover min-h-[180px] xs:min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[2] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-3 xs:left-4 md:left-6 bottom-3 xs:bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-base xs:text-lg md:text-2xl tracking-wide">Goa</div>
              <div className="text-xs xs:text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Kerala (index 3) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[180px] xs:min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 3 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 3 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={keralaImg} alt="Kerala" className={`w-full h-full object-cover min-h-[180px] xs:min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[3] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-3 xs:left-4 md:left-6 bottom-3 xs:bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-base xs:text-lg md:text-2xl tracking-wide">KERALA</div>
              <div className="text-xs xs:text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Jaipur (index 4) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[180px] xs:min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 4 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 4 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={jaipImg} alt="Jaipur" className={`w-full h-full object-cover min-h-[180px] xs:min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[4] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-3 xs:left-4 md:left-6 bottom-3 xs:bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-base xs:text-lg md:text-2xl tracking-wide">Jaipur</div>
              <div className="text-xs xs:text-sm md:text-base mt-0.5">3 Nights / 4 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Holidays By Theme Section */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 pt-4 md:pt-8 pb-0">
        <div className="text-center mb-6 xs:mb-8 sm:mb-8 md:mb-12">
          <h2 
            className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold relative inline-block mb-3 xs:mb-4"
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
            Explore Holidays By Theme
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Find your perfect getaway, tailored to your interests.
          </p>
        </div>
                <div className="w-full flex justify-center relative min-h-[120px] xs:min-h-[140px] md:min-h-[180px]">
          {/* Left Arrow */}
          <button
            onClick={() => {
              handleThemeUserEngage();
              themeCarouselRef.current.scrollLeft -= 300;
            }}
            className="absolute left-2 xs:left-3 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg xs:text-xl sm:text-xl md:text-2xl text-purple-700">{'←'}</span>
          </button>
          
          {/* Carousel Container */}
          <div className="w-full max-w-[1200px] flex items-center mx-auto relative px-10 xs:px-12 sm:px-16 md:px-20">
            {/* Carousel */}
            <div
              ref={themeCarouselRef}
              id="theme-carousel"
              className="flex gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-12 overflow-x-auto scroll-smooth py-4 pb-8 scrollbar-hide w-full"
            >
              {/* Card Data */}
              {(() => {
                const themeOptions = [
                  {
                    title: 'Family',
                   
                    icon: <FamilyIcon />,
                  },
                  {
                    title: 'Beach',
                    
                    icon: <BeachIcon />,
                  },
                  {
                    title: 'Weekend',
                    
                     icon: <TravelIcon />,
                  },
                  {
                    title: 'Honeymoon',
                     
                    icon: <HoneymoonIcon />,
                  },
                  {
                    title: 'Adventure',
                    
                    icon: <AdventureIcon />,
                  },
                  {
                    title: 'Beach',
                    
                    icon: <BeachIcon />,
                  },
                  { 
                    title: 'Pilgrimage',
                    
                    icon: <PilgrimageIcon />,
                  },
                ];
                const themeList = [...themeOptions, ...themeOptions];
                return (
                  <>
                    {themeList.map((theme, idx) => (
                      <div
                        key={theme.title + '-' + idx}
                        className="min-w-[80px] min-h-[80px] xs:min-w-[100px] xs:min-h-[100px] sm:min-w-[120px] sm:min-h-[120px] md:min-w-[140px] md:min-h-[140px] lg:min-w-[160px] lg:min-h-[160px] max-w-[90px] xs:max-w-[110px] sm:max-w-[130px] md:max-w-[150px] lg:max-w-[180px] max-h-[90px] xs:max-h-[110px] sm:max-h-[130px] md:max-h-[150px] lg:max-h-[180px] bg-transparent border-2 border-blue-500 rounded-full flex flex-col items-center justify-center shadow-md mb-2 transition-all duration-200 cursor-pointer relative select-none hover:bg-white/10 hover:shadow-xl"
                        onMouseDown={handleThemeUserEngage}
                        onTouchStart={handleThemeUserEngage}
                      >
                        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mb-1 md:mb-2 flex items-center justify-center">{theme.icon}</div>
                        <div className="font-bold text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-zinc-900 mb-0.5 text-center px-1">{theme.title}</div>
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
          
          {/* Right Arrow */}
          <button
            onClick={() => {
              handleThemeUserEngage();
              themeCarouselRef.current.scrollLeft += 300;
            }}
            className="absolute right-2 xs:right-3 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg xs:text-xl sm:text-xl md:text-2xl text-purple-700">{'→'}</span>
          </button>
        </div>
      </section>

      {/* Explore The Hidden Gems Section */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 py-4 md:py-8 relative rounded-3xl bg-transparent shadow-none">
        <div className="text-center mb-6 xs:mb-8 sm:mb-8 md:mb-12">
          <h2 
            className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold relative inline-block mb-3 xs:mb-4"
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
            Explore The Hidden Gems
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Tap into the untapped tourist spots for amazing vacations.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[1000px] rounded-2xl overflow-hidden relative shadow-lg bg-gray-200 min-h-[200px] xs:min-h-[240px] md:min-h-[320px]">
            <img src={hiddenGems[hiddenGemIdx].img} alt={hiddenGems[hiddenGemIdx].name} className="w-full h-[240px] xs:h-[280px] md:h-[360px] object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute left-4 xs:left-6 md:left-12 bottom-4 xs:bottom-6 md:bottom-12 text-white">
              <div className="font-bold text-lg xs:text-xl md:text-3xl tracking-wide">{hiddenGems[hiddenGemIdx].name}</div>
              <div className="text-sm xs:text-base md:text-lg mt-0.5">{hiddenGems[hiddenGemIdx].state}</div>
            </div>
          </div>
          {/* Pagination dots */}
          <div className="flex gap-2 md:gap-3 justify-center mt-4 md:mt-6">
            {hiddenGems.map((_, idx) => (
              <span key={idx} className={`w-[12px] xs:w-[14px] md:w-[18px] h-[6px] xs:h-[8px] md:h-[10px] rounded-lg ${idx === hiddenGemIdx ? 'bg-slate-500' : 'bg-gray-200'} inline-block transition-colors duration-200`} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Booking With Us Section */}
      <section className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1050px] px-4 xs:px-6 sm:px-8 md:px-10 lg:px-34 py-6 md:py-8 bg-indigo-100 rounded-2xl xs:rounded-3xl shadow-2xl">
        <div className="flex flex-wrap gap-3 xs:gap-4 sm:gap-6 md:gap-8 justify-center">
          <div className="w-full mb-4 md:mb-6">
            <h2 
              className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold relative inline-block mb-3 xs:mb-4 text-center"
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
              Benefits of Booking With Us
              <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light text-center px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Discover the unrivalled benefits that promise memorable journeys all along.
            </p>
          </div>
          {[
            {
              icon: <TravelIcon />,
              title: 'Customised Itineraries',
              desc: 'Enjoy our bespoke tour packages that can be tailored according to your preferences for personalised experience.'
            },
            {
              icon: <WalletIcon />,
              title: 'Wallet-Friendly Prices',
              desc: 'Every traveller from worldwide can embark on unforgettable journeys with our unbeatable holiday package prices.'
            },
            {
              icon: <DealsIcon />,
              title: 'Exciting Deals',
              desc: 'Our platform comprises perfect deals and discounts on all exclusive holiday packages to ensure value-for-money.'
            },
            {
              icon: <SupportIcon />,
              title: '24/7 Support',
              desc: 'Our customer support team is always available to assist you and resolve travel-related queries instantly.'
            }
          ].map((card, idx) => (
            <div
              key={card.title}
              className="flex-1 min-w-[100px] xs:min-w-[110px] sm:min-w-[120px] md:min-w-[140px] max-w-[140px] xs:max-w-[150px] sm:max-w-[160px] md:max-w-[180px] bg-white border border-indigo-200 rounded-xl p-2 xs:p-3 md:p-5 shadow-md flex flex-col items-center text-center transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-xl"
            >
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 md:mb-2.5 flex items-center justify-center">{card.icon}</div>
              <div className="font-bold text-xs xs:text-sm md:text-base mb-1 md:mb-1.5 px-1">{card.title}</div>
              <div className="text-zinc-700 text-[10px] xs:text-xs md:text-sm px-1">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
      
      {/* Login Modal */}
      <Login 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowSignupModal(true)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Signup Modal */}
      <CreateNew 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onOpenLogin={() => setShowLoginModal(true)}
      />
    </div>
  );
}

export default Home;
