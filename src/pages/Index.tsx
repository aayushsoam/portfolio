
import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import ProjectShowcase from "../components/ProjectShowcase";
import CertificatesSection from "../components/CertificatesSection";
import Contact from "../components/Contact";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Allow the preloader animation to play with a slightly longer duration
    // to properly see all the default words animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add a slight delay before showing content for a smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <motion.main 
        className="bg-[#141516] w-full overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <ProjectShowcase />
        <CertificatesSection />
        <Contact />
      </motion.main>
    </>
  );
};

export default Index;
