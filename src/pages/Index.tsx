
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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <Preloader />
      
      <AnimatePresence>
        {!isLoading && (
          <main className="bg-white">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <ProjectShowcase />
            <Contact />
          </main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
