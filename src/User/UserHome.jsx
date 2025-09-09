import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import '../App.css';
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
import logoImg from '../assets/Images/lllg.png';
import roadImg from '../assets/Images/road.jpg';
import bikeImg from '../assets/Images/bike.jpg';
import addImg from '../assets/Images/add.jpg';
import fourByFourImg from '../assets/Images/four.jpg';
import heroVideo from '../assets/Images/pkkp.mp4';
import himaImg from '../assets/Images/hima.jpg';
import sec1Img from '../assets/Images/sec1.jpeg';
import sec2Img from '../assets/Images/sec2.jpeg';
import sec3Img from '../assets/Images/sec3.jpeg';
import sec4Img from '../assets/Images/sec4.jpeg';
import sec5Img from '../assets/Images/sec5.png';
import sec6Img from '../assets/Images/sec6.JPG';
import sec7Img from '../assets/Images/sec7.JPG';
import sec8Img from '../assets/Images/sec8.png';
import sec10Img from '../assets/Images/sec10.JPG';
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
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  // Trending destinations auto-scroll
  const trendingRef = useRef(null);
  const [trendingAutoScroll, setTrendingAutoScroll] = useState(true);
  const [trendingTranslateX, setTrendingTranslateX] = useState(0);
  const cardWidth = 240; // width + gap
  const visibleCards = 4; // Number of cards visible at once
  
  // Curated section (no auto-scroll)
  const curatedRef = useRef(null);
  const [curatedTranslateX, setCuratedTranslateX] = useState(0);
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
  const [heroVideoSrc, setHeroVideoSrc] = useState(heroVideo);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [visibleImages, setVisibleImages] = useState(new Set([0, 1, 2, 3, 4])); // First 5 cards visible initially
  const [hoveredImage, setHoveredImage] = useState(null);
  const [storiesHovered, setStoriesHovered] = useState(false);
  const [currentStoryImage, setCurrentStoryImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageChangeTimeout, setImageChangeTimeout] = useState(null);
  const navigate = useNavigate();

  // Function to handle card clicks with authentication check
  const handleCardClick = (themeName = null) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/userexplore', { state: { themeName } });
    }
  };

  // Function to handle search results from Header
  const handleSearchResults = (results, query) => {
    console.log('UserHome: Received search results:', results, 'for query:', query);
    setSearchResults(results || []);
    setSearchQuery(query || '');
    setShowSearchResults(true);
    
    // Scroll to search results section
    setTimeout(() => {
      const searchSection = document.getElementById('search-results-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to handle trip card click from search results
  const handleTripClick = (trip) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/userdetailbooking', { state: { trip } });
    }
  };

  // Function to handle individual image hover
  const handleImageHover = (index) => {
    setHoveredImage(index);
    // Fade out the first 5 cards when hovering over any image
    if (index < 5) {
      setVisibleImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    } else {
      // Show the hovered image
      setVisibleImages(prev => new Set([...prev, index]));
    }
  };

  const handleImageLeave = (index) => {
    setHoveredImage(null);
    // Restore the first 5 cards when leaving
    if (index < 5) {
      setVisibleImages(prev => new Set([...prev, index]));
    } else {
      // Hide the non-initial image
      setVisibleImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  // Console log authentication state and token
  useEffect(() => {
    console.log('UserHome: Authentication state:', { isAuthenticated, user });
    
    // Get token from localStorage
    const token = localStorage.getItem('tripNovaAuthToken');
    console.log('UserHome: Stored token:', token);
    
    // Get full auth data from localStorage
    const authData = localStorage.getItem('tripNovaAuth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        console.log('UserHome: Full auth data from localStorage:', parsedAuth);
      } catch (error) {
        console.error('UserHome: Error parsing auth data:', error);
      }
    }
  }, [isAuthenticated, user]);

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
    // Pause auto-scroll when user interacts
    setTrendingAutoScroll(false);
  };

  const handleUserLeave = () => {
    // Resume auto-scroll immediately when user stops interacting
    setTrendingAutoScroll(true);
  };

  const scrollByCard = (dir) => {
    const cardWidthWithGap = cardWidth + 32;
    const shiftAmount = cardWidthWithGap;
    const maxTranslate = -(destinations.length - visibleCards) * cardWidthWithGap;
    
    if (dir === 'left') {
      setTrendingTranslateX(prev => Math.min(0, prev + shiftAmount));
    } else {
      setTrendingTranslateX(prev => Math.max(maxTranslate, prev - shiftAmount));
    }
    // Pause auto-scroll when user manually scrolls
    setTrendingAutoScroll(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        
        // Check if we're still in the hero section
        if (scrollPosition < heroHeight) {
          setIsInHeroSection(true);
        } else {
          setIsInHeroSection(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide for trending destinations - 4 cards visible, shift left
  useEffect(() => {
    if (!trendingAutoScroll) return;
    
    const slideInterval = setInterval(() => {
      setTrendingTranslateX(prev => {
        const cardWidthWithGap = cardWidth + 32; // card width + gap
        const shiftAmount = cardWidthWithGap; // Shift by one card width
        const maxTranslate = -(destinations.length - visibleCards) * cardWidthWithGap;
        
        if (prev <= maxTranslate) {
          return 0; // Reset to beginning when reaching the end
        }
        return prev - shiftAmount; // Shift all cards to the left
      });
    }, 3000); // Shift every 3 seconds
    
    return () => clearInterval(slideInterval);
  }, [trendingAutoScroll, destinations.length, cardWidth, visibleCards]);

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

  // Story images for the Stories Etched section
  const storyImages = [
    sec1Img, sec2Img, sec3Img, sec4Img, sec5Img,
    sec6Img, sec7Img, sec8Img,  sec10Img
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with bjfe.mp4 Video */}
      <section id="hero-section" className="w-full h-screen relative overflow-hidden">
        {/* Background Video */}
        <video 
          src={heroVideoSrc} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ 
            minHeight: '100vh', 
            minWidth: '100vw'
          }}
          onLoadedData={() => console.log('Hero video loaded successfully:', heroVideoSrc)}
          onError={(e) => {
            console.error('Error loading hero video:', e);
          }}
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none px-2 sm:px-4">
          {/* Main Title - Trippnova in Poppins */}
         
          
          {/* Remo Logo */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <img 
                src="/sdsd.png" 
              alt="Remo Logo" 
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto pointer-events-none"
              style={{
                filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))'
              }}
            />
          </div>
          
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

      {/* Header Component - Positioned absolutely over hero section */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        onSearchResults={handleSearchResults}
        isInHeroSection={isInHeroSection}
      />

      {/* Rest of content with proper spacing */}
      <div className="pt-[60px]">

      {/* Search Results Section */}
      {showSearchResults && (
        <section id="search-results-section" className="my-4 xs:my-6 sm:my-8 md:my-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 py-4 md:py-8 relative">
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
              Search Results for "{searchQuery}"
              <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {searchResults.length > 0 ? `Found ${searchResults.length} trip${searchResults.length === 1 ? '' : 's'} matching your search` : 'No trips found matching your search criteria'}
            </p>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
              {searchResults.map((trip, index) => (
                <div
                  key={trip._id || index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => handleTripClick(trip)}
                >
                  {/* Trip Image */}
                  <div className="relative h-48 xs:h-56 md:h-64 overflow-hidden">
                    <img
                      src={trip.coverImage || trip.image || '/ll.png'}
                      alt={trip.title || 'Trip'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/ll.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  
                  {/* Trip Details */}
                  <div className="p-4 xs:p-5 md:p-6">
                    <h3 className="font-bold text-lg xs:text-xl md:text-2xl text-gray-900 mb-2 line-clamp-2">
                      {trip.title || 'Trip Package'}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {trip.destination || 'Destination'}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {trip.description || 'No description available'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">Try searching with different keywords or browse our popular destinations below.</p>
              <button 
                onClick={() => setShowSearchResults(false)}
                className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 transition-all"
              >
                Browse All Trips
              </button>
            </div>
          )}
        </section>
      )}

      {/* Curated Journeys by Trippnova Section (match Top Trending Destinations style) */}
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
        <div
          ref={curatedRef}
          className="overflow-hidden pb-2 px-2 xs:px-3 sm:px-4"
        >
          <div
            className="flex gap-4 xs:gap-5 sm:gap-6 md:gap-8 flex-nowrap transition-transform duration-500 ease-in-out py-6"
            style={{ transform: `translateX(${curatedTranslateX}px)` }}
          >
            {organisedCards.map((card, idx) => (
              <div
                key={card.title}
                className="relative w-[190px] xs:w-[220px] sm:w-[240px] md:w-[240px] lg:w-[290px] h-[300px] xs:h-[340px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex-shrink-0 select-none cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-6 hover:z-30 transition-all duration-500 ease-out group"
                onClick={() => handleCardClick(card.title)}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4">
                  <span className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl text-center block drop-shadow-lg">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Trending Destinations Section */}
      <section className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 mb-4 xs:mb-6 sm:mb-8 md:mb-12 mx-auto max-w-[1300px] px-2 xs:px-3 sm:px-4 py-4 md:py-8 relative">
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
          className="overflow-hidden pb-2 px-12 xs:px-14 sm:px-16 md:px-20 lg:px-24"
          onMouseEnter={handleUserEngage}
          onMouseLeave={handleUserLeave}
          onTouchStart={handleUserEngage}
          onTouchEnd={handleUserLeave}
        >
          <div
            className="flex gap-4 xs:gap-5 sm:gap-6 md:gap-8 flex-nowrap transition-transform duration-500 ease-in-out py-6"
            style={{ transform: `translateX(${trendingTranslateX}px)` }}
          >
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="relative w-[190px] xs:w-[220px] sm:w-[240px] md:w-[240px] lg:w-[290px] h-[300px] xs:h-[340px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex-shrink-0 select-none cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-6 hover:z-30 transition-all duration-500 ease-out group"
                onClick={() => handleCardClick(dest.label)}
              >
                <img
                  src={dest.img}
                  alt={dest.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4">
                  <span className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl text-center block drop-shadow-lg">
                    {dest.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
            onClick={() => handleCardClick('Kashmir')}
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
            onClick={() => handleCardClick('Shimla')}
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
            onClick={() => handleCardClick('Goa')}
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
            onClick={() => handleCardClick('Kerala')}
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
            onClick={() => handleCardClick('Jaipur')}
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
                        onClick={() => handleCardClick(theme.title)}
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

      {/* Stories Etched in Every Journey Section */}
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
            Stories Etched in Every Journey
            <span className="block w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-2 xs:mt-3 mx-auto"></span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 italic font-light px-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Capturing moments that last a lifetime, one journey at a time.
          </p>
        </div>
        
        {/* Photo Grid with Hover Effect */}
        <div 
          className="bg-white rounded-3xl p-6 xs:p-8 md:p-12 shadow-lg relative min-h-[400px] cursor-pointer"
          onMouseEnter={() => setStoriesHovered(true)}
          onMouseLeave={() => {
            setStoriesHovered(false);
            setCurrentStoryImage(null);
            // Clear timeout when leaving
            if (imageChangeTimeout) {
              clearTimeout(imageChangeTimeout);
              setImageChangeTimeout(null);
            }
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const newPosition = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };
            
            // Update mouse position immediately for smooth following
            setMousePosition(newPosition);
            
            // Clear existing timeout
            if (imageChangeTimeout) {
              clearTimeout(imageChangeTimeout);
            }
            
            // Add delay before changing image (300ms delay)
            const timeout = setTimeout(() => {
              const containerWidth = rect.width;
              const containerHeight = rect.height;
              const xPercent = newPosition.x / containerWidth;
              const yPercent = newPosition.y / containerHeight;
              
              // Create more granular grid for better distribution
              // Use 5x5 grid for 25 different areas, cycling through 9 images
              const gridX = Math.floor(xPercent * 5); // 5 columns
              const gridY = Math.floor(yPercent * 5); // 5 rows
              const gridPosition = gridY * 5 + gridX; // 0-24 positions
              
              // Map 25 grid positions to 9 images with better distribution
              // This ensures each image gets triggered at multiple different points
              const imageIndex = gridPosition % storyImages.length;
              
              setCurrentStoryImage(storyImages[imageIndex]);
            }, 300); // Reduced to 300ms for faster response
            
            setImageChangeTimeout(timeout);
          }}
        >
          <div className="relative w-full h-full">
            {/* Default placeholder when not hovering */}
            {!storiesHovered && !currentStoryImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Hover to see our stories</p>
                </div>
              </div>
            )}

            {/* Single image that follows cursor */}
            {storiesHovered && currentStoryImage && (
              <div 
                className="absolute w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 pointer-events-none z-20"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <img
                  src={currentStoryImage}
                  alt="Story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-center">
                  <div className="text-xs font-medium">Travel Story</div>
                </div>
              </div>
            )}
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
      />
      
      {/* Signup Modal */}
      <CreateNew 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onOpenLogin={() => setShowLoginModal(true)}
      />
      </div>
    </div>
  );
}

export default Home;
