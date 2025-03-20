
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 md:px-16 py-6">
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-lg -z-10"
          />
        )}
      </AnimatePresence>

      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Magnetic>
          <a href="#" className="text-lg font-medium">
            Minimalist
          </a>
        </Magnetic>

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

        <Magnetic>
          <button className="bg-black text-white py-2 px-5 rounded-full text-sm">
            Get in touch
          </button>
        </Magnetic>
      </nav>
    </header>
  );
};

export default Navbar;
