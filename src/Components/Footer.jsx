import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 px-4 pt-12 pb-6 text-zinc-900 text-sm">
      <div className="max-w-[1300px] mx-auto flex flex-wrap gap-10 justify-between">
        {/* Logo and About */}
        <div className="min-w-[180px] mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-extrabold tracking-tight">Trippnova</span>
          </div>
          <div className="font-bold mb-3 uppercase tracking-wide text-xs">About Trippnova</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/about')}>Who We Are</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/blog')}>Blog</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/contact')}>Contact Us</div>
        </div>
        {/* For Agencies */}
        <div className="min-w-[180px] mb-8">
          <div className="font-bold mb-3 uppercase tracking-wide text-xs">For Agencies</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/agency')}>Partner With Us</div>
        
        </div>
        {/* Learn More */}
        <div className="min-w-[180px] mb-8">
          <div className="font-bold mb-3 uppercase tracking-wide text-xs">Learn More</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/privacy')}>Privacy</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/security')}>Security</div>
          <div className="text-zinc-700 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors text-xs" onClick={() => navigate('/terms')}>Terms</div>
        </div>
        {/* Social Links and App Badges */}
        <div className="min-w-[180px] mb-8 flex flex-col items-start">
          <div className="font-bold mb-3 uppercase tracking-wide text-xs">Social Links</div>
          <div className="flex gap-3 mb-4">
            {/* Facebook */}
            <span className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.12 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0c29.6 0 53.6 24.1 53.6 53.6 0 29.6-24 53.7-53.6 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 16-44 31.4-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/>
              </svg>
            </span>
            {/* Instagram */}
            <span 
              className="inline-block cursor-pointer hover:text-pink-500 transition-colors"
              onClick={() => window.open('https://www.instagram.com/trippnova_/', '_blank')}
              title="Follow us on Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1C388.7 9.9 357.3 1.7 322 0 285.7-1.7 162.3-1.7 126 0 90.7 1.7 59.3 9.9 33.9 36.2 9.9 59.3 1.7 90.7 0 126c-1.7 36.3-1.7 159.7 0 196 1.7 35.3 9.9 66.7 36.2 92.1 23.1 23.1 54.5 31.3 89.8 33 36.3 1.7 159.7 1.7 196 0 35.3-1.7 66.7-9.9 92.1-36.2 23.1-23.1 31.3-54.5 33-89.8 1.7-36.3 1.7-159.7 0-196zm-48.5 262c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.1s2.6 102.7-9 132.1z"/>
              </svg>
            </span>
            {/* Twitter */}
            <span 
              className="inline-block cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => window.open('https://x.com/trippnova_', '_blank')}
              title="Follow us on Twitter/X"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                <path d="M512 97.2c-19 8.4-39.3 14-60.6 16.6 21.8-13 38.5-33.6 46.4-58-20.4 12.1-43 20.9-67.1 25.6C414.7 66.1 389.6 56 362.6 56c-52.1 0-94.3 42.2-94.3 94.3 0 7.4.8 14.6 2.4 21.5C178.1 167.1 94.5 124.1 40.2 59.2c-8.1 13.9-12.7 30.1-12.7 47.4 0 32.7 16.7 61.6 42.1 78.5-15.5-.5-30.1-4.7-42.9-11.8v1.2c0 45.7 32.5 83.8 75.6 92.5-7.9 2.2-16.2 3.4-24.8 3.4-6.1 0-11.9-.6-17.6-1.7 11.9 37.1 46.5 64.1 87.5 64.8-32.1 25.2-72.5 40.2-116.4 40.2-7.6 0-15.1-.4-22.5-1.3C41.1 426.1 89.8 440 141.1 440c169.2 0 261.9-140.2 261.9-261.9 0-4-.1-8-.3-12 18-13 33.6-29.2 46-47.7z"/>
              </svg>
            </span>
            {/* YouTube */}
            <span className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 576 512">
                <path d="M549.655 124.083c-6.281-23.65-24.84-42.21-48.49-48.49C465.5 64 288 64 288 64s-177.5 0-213.165 11.593c-23.65 6.281-42.21 24.84-48.49 48.49C16 159.748 16 256 16 256s0 96.252 10.345 131.917c6.281 23.65 24.84 42.21 48.49 48.49C110.5 448 288 448 288 448s177.5 0 213.165-11.593c23.65-6.281 42.21-24.84 48.49-48.49C560 352.252 560 256 560 256s0-96.252-10.345-131.917zM232 336V176l142.857 80L232 336z"/>
              </svg>
            </span>
            {/* LinkedIn */}
            <span className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91V127.91c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"/>
              </svg>
            </span>
          </div>
        </div>
        {/* Country/Language Selectors */}
        <div className="flex flex-col gap-4 items-end min-w-[180px] mb-8">
          <div className="flex gap-4">
           
           
          </div>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mt-10 border-t border-gray-200 pt-6 text-center text-xs text-zinc-700">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2025 © Trippnova™ Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
