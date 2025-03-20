
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 md:px-16 py-6">
      <AnimatePresence>
        {scrolled && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 backdrop-blur-lg -z-10 bg-white/0" />}
      </AnimatePresence>

      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Magnetic>
          <a href="#" className="text-lg font-medium">
            Minimalist
          </a>
        </Magnetic>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-12">
          <li>
            <Magnetic>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity">
                Work
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity">
                About
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity">
                Services
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic>
              <a href="#" className="text-sm hover:opacity-70 transition-opacity">
                Contact
              </a>
            </Magnetic>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 p-2"
          >
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center"
            >
              <ul className="space-y-8 text-center">
                <li>
                  <a 
                    href="#" 
                    className="text-xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <Magnetic>
          <button className="bg-black text-white py-2 px-5 rounded-full text-sm hidden md:block">
            Get in touch
          </button>
        </Magnetic>
      </nav>
    </header>;
};
export default Navbar;
