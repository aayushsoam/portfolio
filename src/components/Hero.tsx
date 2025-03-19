
import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const firstText = useRef<HTMLParagraphElement | null>(null);
  const secondText = useRef<HTMLParagraphElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  let xPercent = 0;
  let direction = -1;
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
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
        delay: 2.5
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
      {/* Background image with lower z-index */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/0687a79e-6796-4aa0-9b7f-2f387647a9f2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Sliding text with higher z-index */}
      <div className="absolute bottom-[100px] left-0 w-full z-10">
        <div ref={sliderRef} className="relative whitespace-nowrap">
          <p ref={firstText} className="relative m-0 text-[160px] md:text-[230px] font-medium text-white inline-block pr-[50px]">
            Aayush Soam —
          </p>
          <p ref={secondText} className="absolute left-[100%] top-0 m-0 text-[160px] md:text-[230px] font-medium text-white inline-block pr-[50px]">
            Aayush Soam —
          </p>
        </div>
      </div>
      
      {/* Freelance text and arrow with higher z-index */}
      <div className="absolute top-[35%] left-[65%] text-white text-2xl font-light z-10">
        <svg className="transform scale-[2] mb-[100px]" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <p className="m-0 mb-2.5">Freelance</p>
        <p className="m-0 mb-2.5">Designer & Developer</p>
      </div>
    </motion.section>
  );
};

export default Hero;
