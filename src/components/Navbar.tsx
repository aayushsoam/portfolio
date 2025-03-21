
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true); // Start with assuming dark background
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Check background color - if scrolled enough, assume we might be on a white section
      // This is a simplified approach - for a real app you'd want to check the actual background
      if (window.scrollY > 600) {
        setIsDarkBg(false);
      } else {
        setIsDarkBg(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleNavigation = (path: string) => {
    // When navigation is triggered, reload the page to show the loader
    window.location.href = path;
  };

  // Dynamic text and indicator colors based on background
  const textColor = isDarkBg ? "text-white" : "text-black";
  const indicatorColor = isDarkBg ? "bg-white" : "bg-black";
  const hoverColor = isDarkBg ? "hover:text-gray-300" : "hover:text-gray-700";
  const buttonBgColor = isDarkBg ? "bg-white" : "bg-black";
  const buttonTextColor = isDarkBg ? "text-black" : "text-white";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-4 xs:px-6 sm:px-12 md:px-16 py-4 md:py-6 transition-colors duration-300`}>
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className={`absolute inset-0 backdrop-blur-lg -z-10 ${isDarkBg ? 'bg-black/10' : 'bg-white/80'} rounded-full mx-[240px]`} 
          />
        )}
      </AnimatePresence>

      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Magnetic>
          <Link to="/" className={`text-base xs:text-lg font-medium ${textColor} transition-colors duration-300`}>
            Minimalist
          </Link>
        </Magnetic>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <li className="relative">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/work')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
              >
                Work
              </button>
            </Magnetic>
            {currentPath === '/work' && (
              <div className={`absolute h-1 w-1 ${indicatorColor} rounded-full mx-auto left-0 right-0 bottom-[-8px]`}></div>
            )}
          </li>
          <li className="relative">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/about')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
              >
                About
              </button>
            </Magnetic>
            {currentPath === '/about' && (
              <div className={`absolute h-1 w-1 ${indicatorColor} rounded-full mx-auto left-0 right-0 bottom-[-8px]`}></div>
            )}
          </li>
          <li className="relative">
            <Magnetic>
              <a href="#" className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}>
                Services
              </a>
            </Magnetic>
          </li>
          <li className="relative">
            <Magnetic>
              <a href="#" className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}>
                Contact
              </a>
            </Magnetic>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden z-50 p-2 flex flex-col items-center justify-center space-y-1.5">
                <div className={`w-6 h-0.5 ${indicatorColor} transition-colors duration-300`}></div>
                <div className={`w-6 h-0.5 ${indicatorColor} transition-colors duration-300`}></div>
                <div className={`w-6 h-0.5 ${indicatorColor} transition-colors duration-300`}></div>
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-sm p-0 bg-[#141516] border-l-[#2a2a2a]">
              <div className="flex flex-col h-full justify-center items-center">
                <ul className="space-y-8 text-center">
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/work')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                    >
                      Work
                    </button>
                    {currentPath === '/work' && (
                      <div className="absolute h-1 w-1 bg-white rounded-full mx-auto left-0 right-0 bottom-[-8px]"></div>
                    )}
                  </li>
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/about')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                    >
                      About
                    </button>
                    {currentPath === '/about' && (
                      <div className="absolute h-1 w-1 bg-white rounded-full mx-auto left-0 right-0 bottom-[-8px]"></div>
                    )}
                  </li>
                  <li>
                    <a href="#" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
                <Magnetic>
                  <button className="bg-white text-black py-2 px-5 rounded-full text-sm mt-10">
                    Get in touch
                  </button>
                </Magnetic>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <Magnetic>
          <button className={`${buttonBgColor} ${buttonTextColor} py-2 px-5 rounded-full text-sm hidden md:block transition-colors duration-300`}>
            Get in touch
          </button>
        </Magnetic>
      </nav>
    </header>
  );
};

export default Navbar;
