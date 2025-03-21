import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { AnimatePresence } from "framer-motion";
const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Allow the preloader animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);
  return <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && <main className="bg-[#141516] w-full overflow-x-hidden">
          <Navbar />
          <div className="pt-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 py-[137px]">
            <div className="max-w-7xl mx-auto mb-16">
              <span className="text-sm text-gray-500 block mb-4">ABOUT</span>
              <h2 className="text-4xl sm:text-5xl font-light text-white">Skills & Experience</h2>
            </div>
          </div>
          <Skills />
          <Contact />
        </main>}
    </>;
};
export default About;