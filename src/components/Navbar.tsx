import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
  return <header className="fixed top-0 left-0 w-full z-50 px-4 xs:px-6 sm:px-12 md:px-16 py-4 md:py-6">
      <AnimatePresence>
        {scrolled && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 backdrop-blur-lg -z-10 bg-white/0 rounded-full mx-[240px]" />}
      </AnimatePresence>

      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Magnetic>
          <a href="#" className="text-base xs:text-lg font-medium">
            Minimalist
          </a>
        </Magnetic>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-12">
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

        {/* Mobile Menu */}
        {isMobile && <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden z-50 p-2 flex flex-col items-center justify-center space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-sm p-0 bg-[#141516] border-l-[#2a2a2a]">
              <div className="flex flex-col h-full justify-center items-center">
                <ul className="space-y-8 text-center">
                  <li>
                    <a href="#" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                      About
                    </a>
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
          </Sheet>}

        <Magnetic>
          <button className="bg-white text-black py-2 px-5 rounded-full text-sm hidden md:block">
            Get in touch
          </button>
        </Magnetic>
      </nav>
    </header>;
};
export default Navbar;