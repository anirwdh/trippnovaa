import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Spline from '@splinetool/react-spline';
import Login from '../Components/Login';
import CreateNew from '../Components/CreateNew';
import Header from '../Components/Header';
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
  const [showRoleModal, setShowRoleModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

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
    if (dir === 'left') {
      trending.scrollLeft -= cardWidth;
    } else {
      trending.scrollLeft += cardWidth;
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
      {/* Role Selection Modal */}
      {showRoleModal && (
        <>
          <div className="fixed inset-0 z-[1999] bg-white/60 pointer-events-none" />
          <div className="fixed left-0 right-0 top-0 z-[2000] flex items-start justify-center pointer-events-none">
            <div className="mt-12 bg-white rounded-xl shadow-2xl px-8 py-8 flex flex-col items-center w-full max-w-xs pointer-events-auto">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Continue as</h3>
              <div className="flex flex-row gap-4 w-full">
                <button
                  className="flex-1 py-3 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow hover:bg-purple-200 transition"
                  onClick={() => { setShowRoleModal(false); navigate('/agency'); }}
                >
                  Continue as Agency
                </button>
                <button
                  className="flex-1 py-3 bg-purple-400 text-white font-semibold rounded-lg shadow hover:bg-purple-500 transition"
                  onClick={() => setShowRoleModal(false)}
                >
                  Continue as User
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Header Component */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
      />

      {/* Hero Section with Spline 3D */}
      <section className="w-full h-screen bg-transparent relative">
        <Spline
          scene="https://prod.spline.design/M7wkkObA0X8glgTZ/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none px-4">
          {/* Main Title */}
          <h1 
            className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-widest uppercase mb-4 text-center pointer-events-none"
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
          <div className="w-24 md:w-32 h-px bg-white mb-4 pointer-events-none"></div>
          
          {/* Tagline */}
          <p 
            className="text-sm sm:text-lg md:text-xl font-light tracking-wide uppercase text-center mb-6 md:mb-8 pointer-events-none px-2"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.2)'
            }}
          >
            BEYOND ITINERARIES. INTO EXPERIENCES.
          </p>
          
          {/* Call to Action Button */}
          <button 
            className="px-6 md:px-8 py-2 md:py-3 border border-white rounded-full text-white font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto text-sm md:text-base"
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
      <section className="my-8 md:my-12 mx-auto max-w-[1300px] px-4 py-4 md:py-8 relative" data-section="organised-by-trippnova">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-5xl font-semibold relative inline-block mb-4"
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
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Where Journeys Begin, Beyond the Map.
          </p>
        </div>
        <div className="flex gap-4 md:gap-10 overflow-x-auto scroll-smooth pb-2 scrollbar-hide flex-nowrap justify-start md:justify-center">
          {organisedCards.map((card, idx) => (
            <div
              key={card.title}
              className="flex flex-col items-center w-[200px] md:w-[260px] flex-shrink-0 select-none cursor-pointer"
              onClick={() => navigate('/userexplore')}
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-3xl object-cover mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <span className="font-bold text-lg md:text-xl mt-1 text-center">{card.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Trending Destinations Section */}
      <section className="my-8 md:my-12 mx-auto max-w-[1300px] px-4 py-4 md:py-8 relative">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-5xl font-semibold relative inline-block mb-4"
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
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Explore the hottest travel spots around the globe.
          </p>
        </div>
        {/* Left Arrow */}
        <button
          onClick={() => scrollByCard('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-xl md:text-2xl text-purple-700">{'←'}</span>
        </button>
        {/* Right Arrow */}
        <button
          onClick={() => scrollByCard('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
        >
          <span className="text-xl md:text-2xl text-purple-700">{'→'}</span>
        </button>
        <div
          ref={trendingRef}
          className="flex gap-4 md:gap-10 overflow-x-auto scroll-smooth pb-2 scrollbar-hide flex-nowrap"
        >
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-[180px] md:w-[220px] flex-shrink-0 select-none cursor-pointer"
              onClick={() => navigate('/userexplore')}
            >
              <img
                src={dest.img}
                alt={dest.label}
                className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-3xl object-cover mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <span className="font-bold text-lg md:text-xl mt-1 text-center">{dest.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deals You Can't Miss Section */}
      <section className="my-8 md:my-12 mx-auto max-w-[1300px] px-4 pt-4 md:pt-8 pb-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-5xl font-semibold relative inline-block mb-4"
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
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Travel beyond boundaries with incredible savings
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 md:gap-8 justify-center">
          {/* Kashmir */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 0 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 0 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={kashmirImg} alt="Kashmir" className={`w-full h-full object-cover min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[0] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-lg md:text-2xl tracking-wide">KASHMIR</div>
              <div className="text-sm md:text-base mt-0.5">5 Nights / 6 Days</div>
            </div>
          </div>
          {/* Shimla (tall card) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] shadow-lg col-span-1 row-span-2 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 1 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 1 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={himacImg} alt="Shimla" className={`w-full h-full object-cover min-h-[400px] md:min-h-[500px] transition-transform duration-300 will-change-transform ${dealsHover[1] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-lg md:text-2xl tracking-wide">Shimla</div>
              <div className="text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Goa (index 2) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 2 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 2 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={goaImg} alt="Goa" className={`w-full h-full object-cover min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[2] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-lg md:text-2xl tracking-wide">Goa</div>
              <div className="text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Kerala (index 3) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 3 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 3 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={keralaImg} alt="Kerala" className={`w-full h-full object-cover min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[3] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-lg md:text-2xl tracking-wide">KERALA</div>
              <div className="text-sm md:text-base mt-0.5">4 Nights / 5 Days</div>
            </div>
          </div>
          {/* Jaipur (index 4) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[240px] shadow-lg col-span-1 row-span-1 bg-none cursor-pointer"
            onMouseEnter={() => setDealsHover(h => h.map((v, i) => i === 4 ? true : v))}
            onMouseLeave={() => setDealsHover(h => h.map((v, i) => i === 4 ? false : v))}
            onClick={() => navigate('/userexplore')}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img src={jaipImg} alt="Jaipur" className={`w-full h-full object-cover min-h-[200px] md:min-h-[240px] transition-transform duration-300 will-change-transform ${dealsHover[4] ? 'scale-110' : 'scale-100'}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 md:left-6 bottom-4 md:bottom-7 text-white">
              <div className="font-bold text-lg md:text-2xl tracking-wide">Jaipur</div>
              <div className="text-sm md:text-base mt-0.5">3 Nights / 4 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Holidays By Theme Section */}
      <section className="my-8 md:my-12 mx-auto max-w-[1300px] px-4 pt-4 md:pt-8 pb-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-5xl font-semibold relative inline-block mb-4"
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
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Find your perfect getaway, tailored to your interests.
          </p>
        </div>
                <div className="w-full flex justify-center relative min-h-[140px] md:min-h-[180px]">
          {/* Left Arrow */}
          <button
            onClick={() => {
              handleThemeUserEngage();
              themeCarouselRef.current.scrollLeft -= 300;
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl md:text-2xl text-purple-700">{'←'}</span>
          </button>
          
          {/* Carousel Container */}
          <div className="w-full max-w-[1200px] flex items-center mx-auto relative px-16 md:px-20">
            {/* Carousel */}
            <div
              ref={themeCarouselRef}
              id="theme-carousel"
              className="flex gap-6 md:gap-12 overflow-x-auto scroll-smooth py-4 pb-8 scrollbar-hide w-full"
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
                        className="min-w-[120px] min-h-[120px] md:min-w-[160px] md:min-h-[160px] max-w-[140px] md:max-w-[180px] max-h-[140px] md:max-h-[180px] bg-transparent border-2 border-blue-500 rounded-full flex flex-col items-center justify-center shadow-md mb-2 transition-all duration-200 cursor-pointer relative select-none hover:bg-white/10 hover:shadow-xl"
                        onMouseDown={handleThemeUserEngage}
                        onTouchStart={handleThemeUserEngage}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 mb-1 md:mb-2 flex items-center justify-center">{theme.icon}</div>
                        <div className="font-bold text-[10px] md:text-xs text-zinc-900 mb-0.5 text-center">{theme.title}</div>
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
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white border-none rounded-full shadow-md w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl md:text-2xl text-purple-700">{'→'}</span>
          </button>
        </div>
      </section>

      {/* Explore The Hidden Gems Section */}
      <section className="my-8 md:my-12 mx-auto max-w-[1300px] px-4 py-4 md:py-8 relative rounded-3xl bg-transparent shadow-none">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-5xl font-semibold relative inline-block mb-4"
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
            <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 italic font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Tap into the untapped tourist spots for amazing vacations.
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-[1000px] rounded-2xl overflow-hidden relative shadow-lg bg-gray-200 min-h-[240px] md:min-h-[320px]">
            <img src={hiddenGems[hiddenGemIdx].img} alt={hiddenGems[hiddenGemIdx].name} className="w-full h-[280px] md:h-[360px] object-cover block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute left-6 md:left-12 bottom-6 md:bottom-12 text-white">
              <div className="font-bold text-xl md:text-3xl tracking-wide">{hiddenGems[hiddenGemIdx].name}</div>
              <div className="text-base md:text-lg mt-0.5">{hiddenGems[hiddenGemIdx].state}</div>
            </div>
          </div>
          {/* Pagination dots */}
          <div className="flex gap-2 md:gap-3 justify-center mt-4 md:mt-6">
            {hiddenGems.map((_, idx) => (
              <span key={idx} className={`w-[14px] md:w-[18px] h-[8px] md:h-[10px] rounded-lg ${idx === hiddenGemIdx ? 'bg-slate-500' : 'bg-gray-200'} inline-block transition-colors duration-200`} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Booking With Us Section */}
      <section className="my-8 md:my-12 mx-auto max-w-[1050px] px-34 py-6 md:py-8 bg-indigo-100 rounded-3xl shadow-2xl">
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
          <div className="w-full mb-4 md:mb-6">
            <h2 
              className="text-2xl md:text-4xl font-semibold relative inline-block mb-4 text-center"
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
              <span className=" block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 mx-auto"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 italic font-light text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
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
              className="flex-1 min-w-[120px] md:min-w-[140px] max-w-[160px] md:max-w-[180px] bg-white border border-indigo-200 rounded-xl p-3 md:p-5 shadow-md flex flex-col items-center text-center transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-xl"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-2.5 flex items-center justify-center">{card.icon}</div>
              <div className="font-bold text-sm md:text-base mb-1 md:mb-1.5">{card.title}</div>
              <div className="text-zinc-700 text-xs md:text-sm">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-8 md:mt-12 px-4 pt-8 md:pt-12 pb-6 text-zinc-900 text-sm md:text-base">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row flex-wrap gap-6 md:gap-10 justify-between">
          {/* Logo and About */}
          <div className="min-w-[180px] mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">trippnova</span>
            </div>
            <div className="font-bold mb-2 md:mb-3 uppercase tracking-wide text-xs md:text-sm">About Trippnova</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Who We Are</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Blog</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Contact Us</div>
          </div>
         
          {/* For Agencies */}
          <div className="min-w-[180px] mb-6 md:mb-8">
            <div className="font-bold mb-2 md:mb-3 uppercase tracking-wide text-xs md:text-sm">For Agencies</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Partner With Us</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Add Agency</div>
          </div>
          {/* Learn More */}
          <div className="min-w-[180px] mb-6 md:mb-8">
            <div className="font-bold mb-2 md:mb-3 uppercase tracking-wide text-xs md:text-sm">Learn More</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Privacy</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Security</div>
            <div className="text-zinc-700 mb-1 md:mb-1.5 text-sm">Terms</div>
          </div>
          {/* Social Links and App Badges */}
          <div className="min-w-[180px] mb-6 md:mb-8 flex flex-col items-start">
            <div className="font-bold mb-2 md:mb-3 uppercase tracking-wide text-xs md:text-sm">Social Links</div>
            <div className="flex gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.12 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0c29.6 0 53.6 24.1 53.6 53.6 0 29.6-24 53.7-53.6 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 16-44 31.4-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/>
                </svg>
              </span>
              <span className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1C388.7 9.9 357.3 1.7 322 0 285.7-1.7 162.3-1.7 126 0 90.7 1.7 59.3 9.9 33.9 36.2 9.9 59.3 1.7 90.7 0 126c-1.7 36.3-1.7 159.7 0 196 1.7 35.3 9.9 66.7 36.2 92.1 23.1 23.1 54.5 31.3 89.8 33 36.3 1.7 159.7 1.7 196 0 35.3-1.7 66.7-9.9 92.1-36.2 23.1-23.1 31.3-54.5 33-89.8 1.7-36.3 1.7-159.7 0-196zm-48.5 262c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.1s2.6 102.7-9 132.1z"/>
                </svg>
              </span>
              <span className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M512 97.2c-19 8.4-39.3 14-60.6 16.6 21.8-13 38.5-33.6 46.4-58-20.4 12.1-43 20.9-67.1 25.6C414.7 66.1 389.6 56 362.6 56c-52.1 0-94.3 42.2-94.3 94.3 0 7.4.8 14.6 2.4 21.5C178.1 167.1 94.5 124.1 40.2 59.2c-8.1 13.9-12.7 30.1-12.7 47.4 0 32.7 16.7 61.6 42.1 78.5-15.5-.5-30.1-4.7-42.9-11.8v1.2c0 45.7 32.5 83.8 75.6 92.5-7.9 2.2-16.2 3.4-24.8 3.4-6.1 0-11.9-.6-17.6-1.7 11.9 37.1 46.5 64.1 87.5 64.8-32.1 25.2-72.5 40.2-116.4 40.2-7.6 0-15.1-.4-22.5-1.3C41.1 426.1 89.8 440 141.1 440c169.2 0 261.9-140.2 261.9-261.9 0-4-.1-8-.3-12 18-13 33.6-29.2 46-47.7z"/>
                </svg>
              </span>
              <span className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 576 512">
                  <path d="M549.655 124.083c-6.281-23.65-24.84-42.21-48.49-48.49C465.5 64 288 64 288 64s-177.5 0-213.165 11.593c-23.65 6.281-42.21 24.84-48.49 48.49C16 159.748 16 256 16 256s0 96.252 10.345 131.917c6.281 23.65 24.84 42.21 48.49 48.49C110.5 448 288 448 288 448s177.5 0 213.165-11.593c23.65-6.281 42.21-24.84 48.49-48.49C560 352.252 560 256 560 256s0-96.252-10.345-131.917zM232 336V176l142.857 80L232 336z"/>
                </svg>
              </span>
              <span className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" fill="currentColor" viewBox="0 0 320 512">
                  <path d="M279.14 288l14.22-92.66h-88.91V127.91c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"/>
                </svg>
              </span>
            </div>
          </div>
          {/* Country/Language Selectors */}
          <div className="flex flex-col gap-2 md:gap-4 items-start md:items-end min-w-[180px] mb-6 md:mb-8">
            <div className="flex gap-2 md:gap-4">
              <button className="flex items-center gap-1 md:gap-2 border border-gray-300 rounded px-2 md:px-4 py-1 md:py-2 bg-white text-gray-700 font-medium text-xs md:text-sm">
                <span className="fi fi-in"></span>
                India
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 ml-1 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="flex items-center gap-1 md:gap-2 border border-gray-300 rounded px-2 md:px-4 py-1 md:py-2 bg-white text-gray-700 font-medium text-xs md:text-sm">
                English
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 ml-1 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1300px] mx-auto mt-6 md:mt-10 border-t border-gray-200 pt-4 md:pt-6 text-center text-xs md:text-base text-zinc-700">
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2025 © Trippnova™ Ltd. All rights reserved.
        </div>
      </footer>
      
      {/* Login Modal */}
      <Login 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowSignupModal(true)}
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
