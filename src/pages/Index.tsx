
import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import ProjectShowcase from "../components/ProjectShowcase";
import Contact from "../components/Contact";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Allow the preloader animation to play with a slightly longer duration
    // to properly see all the default words animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <main className="bg-[#141516] w-full overflow-x-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <ProjectShowcase />
          <Contact />
        </main>
      )}
    </>
  );
};

export default Index;
