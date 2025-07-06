
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true); // Start with assuming dark background
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuWords, setMenuWords] = useState<string[]>(["Menu", "Navigation", "Links"]);
  const [menuWordIndex, setMenuWordIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!isMenuOpen) {
      setMenuWordIndex(0); // Reset to first word when menu closes
      return;
    }
    
    if (menuWordIndex === menuWords.length - 1) {
      return; // Stop at the last word
    }
    
    const timeout = setTimeout(() => {
      setMenuWordIndex(menuWordIndex + 1);
    }, menuWordIndex === 0 ? 800 : 150);
    
    return () => clearTimeout(timeout);
  }, [menuWordIndex, menuWords.length, isMenuOpen]);

  const handleNavigation = (path: string) => {
    if (path === '/work' || path === '/about' || path === '/contact') {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  const textColor = isDarkBg ? "text-white" : "text-black";
  const indicatorColor = isDarkBg ? "bg-white" : "bg-black";
  const hoverColor = isDarkBg ? "hover:text-gray-300" : "hover:text-gray-700";
  const buttonBgColor = isDarkBg ? "bg-white" : "bg-black";
  const buttonTextColor = isDarkBg ? "text-black" : "text-white";

  const menuSlideIn = {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    },
    exit: {
      x: "100%",
      transition: { 
        duration: 0.7, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-4 xs:px-6 sm:px-12 md:px-16 py-4 md:py-6 transition-colors duration-300`}>
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: -20 }} 
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 -z-10 rounded-2xl mx-[200px] overflow-hidden"
            style={{
              background: isDarkBg 
                ? `
                  linear-gradient(135deg, 
                    rgba(255,255,255,0.15) 0%, 
                    rgba(255,255,255,0.08) 25%,
                    rgba(255,255,255,0.05) 50%,
                    rgba(255,255,255,0.08) 75%,
                    rgba(255,255,255,0.12) 100%
                  ),
                  radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)
                `
                : `
                  linear-gradient(135deg, 
                    rgba(255,255,255,0.95) 0%, 
                    rgba(255,255,255,0.85) 25%,
                    rgba(255,255,255,0.75) 50%,
                    rgba(255,255,255,0.85) 75%,
                    rgba(255,255,255,0.9) 100%
                  ),
                  radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)
                `,
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              border: isDarkBg 
                ? '1.5px solid rgba(255,255,255,0.15)' 
                : '1.5px solid rgba(255,255,255,0.25)',
              borderTop: isDarkBg 
                ? '1px solid rgba(255,255,255,0.25)'
                : '1px solid rgba(255,255,255,0.4)',
              borderBottom: isDarkBg 
                ? '1px solid rgba(255,255,255,0.05)'
                : '1px solid rgba(255,255,255,0.15)',
              boxShadow: isDarkBg 
                ? `
                  0 20px 40px rgba(0,0,0,0.4),
                  0 8px 16px rgba(0,0,0,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.2),
                  inset 0 -1px 0 rgba(255,255,255,0.05),
                  0 0 0 1px rgba(255,255,255,0.05)
                `
                : `
                  0 20px 40px rgba(0,0,0,0.15),
                  0 8px 16px rgba(0,0,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.9),
                  inset 0 -1px 0 rgba(255,255,255,0.3),
                  0 0 0 1px rgba(255,255,255,0.2)
                `
            }}
          >
            {/* Primary shimmer reflection */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 55%, transparent 100%)',
                transform: 'translateX(-100%) skewX(-12deg)',
                animation: 'enhanced-shimmer 4s ease-in-out infinite',
                animationDelay: '0s'
              }}
            />
            
            {/* Secondary reflection layer */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                transform: 'translateX(100%) skewX(12deg)',
                animation: 'enhanced-shimmer-reverse 5s ease-in-out infinite',
                animationDelay: '1s'
              }}
            />

            {/* Glass texture overlay */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 40%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                  radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)
                `,
              }}
            />

            {/* Frosted edge highlights */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `
                  linear-gradient(to right, rgba(255,255,255,0.3) 0%, transparent 10%),
                  linear-gradient(to left, rgba(255,255,255,0.3) 0%, transparent 10%),
                  linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 10%),
                  linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 10%)
                `,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <Magnetic>
          <Link to="/" className={`text-base xs:text-lg font-medium ${textColor} transition-colors duration-300`}>
            Minimalist
          </Link>
        </Magnetic>

        <ul className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <li className="relative group">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/work')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
                onMouseEnter={() => setHoveredLink('work')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Work
              </button>
            </Magnetic>
            <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
              <div 
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentPath === '/work' 
                    ? indicatorColor
                    : hoveredLink === 'work'
                      ? `${indicatorColor} scale-100`
                      : `${indicatorColor} scale-0`
                }`}
              ></div>
            </div>
          </li>
          <li className="relative group">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/about')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                About
              </button>
            </Magnetic>
            <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
              <div 
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentPath === '/about' 
                    ? indicatorColor
                    : hoveredLink === 'about'
                      ? `${indicatorColor} scale-100`
                      : `${indicatorColor} scale-0`
                }`}
              ></div>
            </div>
          </li>
          <li className="relative group">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/services')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
                onMouseEnter={() => setHoveredLink('services')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Services
              </button>
            </Magnetic>
            <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
              <div 
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentPath === '/services' 
                    ? indicatorColor
                    : hoveredLink === 'services'
                      ? `${indicatorColor} scale-100`
                      : `${indicatorColor} scale-0`
                }`}
              ></div>
            </div>
          </li>
          <li className="relative group">
            <Magnetic>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className={`text-sm ${textColor} hover:opacity-70 transition-all duration-300`}
                onMouseEnter={() => setHoveredLink('contact')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Contact
              </button>
            </Magnetic>
            <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
              <div 
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentPath === '/contact' 
                    ? indicatorColor
                    : hoveredLink === 'contact'
                      ? `${indicatorColor} scale-100`
                      : `${indicatorColor} scale-0`
                }`}
              ></div>
            </div>
          </li>
        </ul>

        {isMobile && (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden z-50 p-2 flex flex-col items-center justify-center space-y-1.5 bg-black rounded-full w-10 h-10">
                <div className="w-5 h-0.5 bg-white transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-white transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-white transition-colors duration-300"></div>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm p-0 bg-[#141516] border-l-[#2a2a2a] overflow-hidden">
              <motion.div 
                variants={menuSlideIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full justify-center items-center"
              >
                <ul className="space-y-8 text-center">
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/work')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                      onMouseEnter={() => setHoveredLink('work-mobile')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Work
                    </button>
                    <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
                      <div 
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          currentPath === '/work' 
                            ? 'bg-white'
                            : hoveredLink === 'work-mobile'
                              ? 'bg-white scale-100'
                              : 'bg-white scale-0'
                        }`}
                      ></div>
                    </div>
                  </li>
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/about')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                      onMouseEnter={() => setHoveredLink('about-mobile')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      About
                    </button>
                    <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
                      <div 
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          currentPath === '/about' 
                            ? 'bg-white'
                            : hoveredLink === 'about-mobile'
                              ? 'bg-white scale-100'
                              : 'bg-white scale-0'
                        }`}
                      ></div>
                    </div>
                  </li>
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/services')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                      onMouseEnter={() => setHoveredLink('services-mobile')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Services
                    </button>
                    <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
                      <div 
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          currentPath === '/services' 
                            ? 'bg-white'
                            : hoveredLink === 'services-mobile'
                              ? 'bg-white scale-100'
                              : 'bg-white scale-0'
                        }`}
                      ></div>
                    </div>
                  </li>
                  <li className="relative">
                    <button 
                      onClick={() => handleNavigation('/contact')} 
                      className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                      onMouseEnter={() => setHoveredLink('contact-mobile')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Contact
                    </button>
                    <div className="absolute bottom-[-8px] left-0 right-0 flex justify-center">
                      <div 
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          currentPath === '/contact' 
                            ? 'bg-white'
                            : hoveredLink === 'contact-mobile'
                              ? 'bg-white scale-100'
                              : 'bg-white scale-0'
                        }`}
                      ></div>
                    </div>
                  </li>
                </ul>
                <Magnetic>
                  <button 
                    onClick={() => handleNavigation('/contact')} 
                    className="bg-white text-black py-2 px-5 rounded-full text-sm mt-10">
                    Get in touch
                  </button>
                </Magnetic>
              </motion.div>
            </SheetContent>
          </Sheet>
        )}

        <Magnetic>
          <button 
            onClick={() => handleNavigation('/contact')} 
            className={`${buttonBgColor} ${buttonTextColor} py-2 px-5 rounded-full text-sm hidden md:block transition-colors duration-300`}>
            Get in touch
          </button>
        </Magnetic>
      </nav>
    </header>
  );
};

export default Navbar;
