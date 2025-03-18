
import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import TextReveal from './TextReveal';
import FadeInWhenVisible from './FadeInWhenVisible';

const Hero = () => {
  const firstText = useRef<HTMLParagraphElement | null>(null);
  const secondText = useRef<HTMLParagraphElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  
  useLayoutEffect(() => {
    let xPercent = 0;
    let direction = -1;
    
    // Horizontal scrolling animation
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction = e.direction * -1;
        }
      },
      x: "-500px",
    });
    
    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent });
        gsap.set(secondText.current, { xPercent });
      }
      requestAnimationFrame(animate);
      xPercent += 0.1 * direction;
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      if (animate) {
        cancelAnimationFrame(0);
      }
    };
  }, []);

  const slideUp = {
    initial: {
      y: 300,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.2
      }
    }
  };

  return (
    <motion.section 
      variants={slideUp}
      initial="initial"
      animate="animate"
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50"></div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-10">
        <div className="absolute w-full h-full rounded-full border border-gray-100 animate-spin-slow opacity-40"></div>
        <div className="absolute w-[90%] h-[90%] top-[5%] left-[5%] rounded-full border border-gray-200 animate-spin-slow opacity-40" style={{ animationDuration: '15s' }}></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full border border-gray-300 animate-spin-slow opacity-40" style={{ animationDuration: '20s' }}></div>
      </div>
      
      <div className="absolute top-[20%] left-[65%] w-16 h-16 bg-gray-50 rounded-full animate-float-slow"></div>
      <div className="absolute top-[70%] left-[20%] w-24 h-24 bg-gray-50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[40%] left-[10%] w-12 h-12 bg-gray-50 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Main content */}
      <div className="container mx-auto h-full flex flex-col justify-center items-center">
        <FadeInWhenVisible delay={0.4} className="text-center mb-12">
          <div className="text-sm text-gray-500 mb-1 tracking-wide">DESIGN WITH PURPOSE</div>
          <TextReveal 
            text="Simplicity is the ultimate sophistication"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight"
            delay={0.6}
          />
        </FadeInWhenVisible>
      </div>
      
      {/* Sliding text */}
      <div className="absolute bottom-[10vh] w-full overflow-hidden">
        <div ref={sliderRef} className="whitespace-nowrap">
          <p ref={firstText} className="relative m-0 text-[160px] md:text-[230px] font-light text-gray-100 inline-block px-10">
            Minimalist Elegance —
          </p>
          <p ref={secondText} className="absolute left-full top-0 m-0 text-[160px] md:text-[230px] font-light text-gray-100 inline-block px-10">
            Minimalist Elegance —
          </p>
        </div>
      </div>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.section>
  );
};

export default Hero;
