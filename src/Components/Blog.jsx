import React from 'react';
import addImg from '../assets/Images/add.jpg';
import TravelIcon from '../assets/animatedicons/travel';
import SupportIcon from '../assets/animatedicons/suport';
import DealsIcon from '../assets/animatedicons/deals';
import WalletIcon from '../assets/animatedicons/wallet';
import FamilyIcon from '../assets/animatedicons/Family';
import BeachIcon from '../assets/animatedicons/Beach';
import Footer from './Footer';

function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
      
           
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
            YOUR PASSPORT TO SOULFUL TRAVEL
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
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
            We are Trippnova
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">
            Trippnova is a fresh and vibrant travel startup with bold ambition to transform the way explorers experience the world. Whether you're planning a soul stirring escape, a customized getaway or group exploration, Trippnova is shaping travel into an unforgettable journey.
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
            What Makes Trippnova Special
          </h3>
          <p className="text-gray-600 mb-8 text-base">
            The 4 core values that define our brand and make us who we are
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  <TravelIcon />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Beautiful Design</h4>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Our website has a clean, modern design that immediately draws you in with intuitive navigation and seamless imagery flow.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  <BeachIcon />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Social Identity</h4>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Our Instagram showcases vibrant visuals and real traveller moments with consistent aesthetic and aspirational tone.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  <FamilyIcon />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Personalization</h4>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Create personal boards, save favourite destinations and let us craft itineraries tailored to your unique tastes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 flex items-center justify-center">
                  <SupportIcon />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Human Touch</h4>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                Connect with travel advisors who understand your preferences and plan around your curated boards with authenticity.
              </p>
            </div>
          </div>
        </div>

        {/* Why Trippnova is a Travel Startup to Watch */}
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
            Why Trippnova is a Travel Startup to Watch
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            Though not yet featured in global startup lists Trippnova reflects many of the emerging industry trends-
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <strong>Experience-Cantered Design</strong> - This aligns with a broader trend among startups prioritizing curated, authentic travel experiences over cookie-cutter trips.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <div>
                <strong>Personalization and storytelling</strong> - The site's board feature and Instagram feed highlight visual storytelling and customization, hallmarks of what Forbes and others flag as travel tech innovation drivers
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-base">
            Trippnova is built around the core values that modern travellers seek: personalization, simplicity and storytelling. By blending user driven inspiration with expert planning, the brand offers a seamless and emotionally engaging travel experience that feels both fresh and trustworthy. With its thoughtful design and authentic approach, Trippnova is well-positioned to resonate with today's evolving travel audience and grow steadily in the coming years.
          </p>
        </div>

        {/* Trippnova's Offerings */}
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
            Trippnova's Offerings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">• Explore & Save</h4>
              <p className="text-blue-800">
                Inspirational photos and destination guides let you visualize your dream trip then easily save your favourites to personal boards.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">• Design with Experts</h4>
              <p className="text-green-800">
                Share your boards, and let a dedicated travel advisor craft a personalized itinerary tailored to your tastes and budget.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-3">• Immersive Experience</h4>
              <p className="text-purple-800">
                The combination of evocative visuals, local stories and curated selections suggests a brand that values meaningful travel not just logistics.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-900 mb-3">• Human Connection</h4>
              <p className="text-orange-800">
                Direct access to advisors fosters a sense of care and authenticity often missing in automated platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Ideal for These Travelers */}
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
            Ideal for These Travelers
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span className="text-gray-700">Explorers seeking personalized, curated travel experiences</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span className="text-gray-700">Those who value a human planner over algorithmic suggestions</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span className="text-gray-700">Picture lovers and story lovers who want inspiration paired with action</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 font-bold mr-3">•</span>
              <span className="text-gray-700">Travelers eager to collaborate and co-create their trip with an expert</span>
            </div>
          </div>
        </div>

        {/* Areas for Growth */}
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
            Areas for Growth
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            Every startup evolves here are a few areas where Trippnova could build further-
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">•</span>
              <div>
                <strong>USPs & Unique Value Story</strong> - What sets Trippnova apart from other boutique planners or aggregators? Emphasizing what they uniquely offer (in-house curation, exclusive partners) would strengthen their brand story.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">•</span>
              <div>
                <strong>Clear Destination Focus</strong> - Highlighting a few flagship destinations or sample packages would help turn browsing into booking.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">•</span>
              <div>
                <strong>Social Proof & Testimonials</strong> - Early client stories or reviews could quickly build trust especially when the community is still growing.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">•</span>
              <div>
                <strong>Booking Flow Preview</strong> - Even if booking isn't live yet showing a mock flow or "coming soon" snippet could build anticipation and credibility.
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
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
            The Trippnova Experience
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            Trippnova feels like a spark in the world of travel tech a destination for travellers craving a mix of inspiration, personalization and human connection. With design driven visuals compelling storytelling and thoughtful planner integration, they resonate with modern travellers looking for more than just an itinerary they want an experience.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            The path ahead could involve refining their identity, sharing early wins and scaling thoughtfully but right now they have all the elements of a memorable, authentic travel brand.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            In a world where travel has become more about ticking boxes than making memories Trippnova brings back the essence of why we explore to feel, to connect and to discover. With Trippnova you're not just booking a trip.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 font-semibold text-base">
            You're building your story. One destination, one memory at a time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            Trippnova is your passport to soulful, seamless and smart travel.
          </p>
        </div>

    

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
          <p className="text-lg mb-6">
            Visit trippnova.vercel.app and start building your dream journey today.
          </p>
          <p className="text-lg mb-6">
            Don't forget to follow their travel inspiration on Instagram @trippnova_.
          </p>
          <p className="text-xl font-semibold">
            Let your next chapter begin with Trippnova because the world is waiting and so is your story.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Blog;
