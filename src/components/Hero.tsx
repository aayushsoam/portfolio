import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const lastScrollY = useRef<number>(0);
  const speedRef = useRef<number>(1); // Positive is right-to-left, negative is left-to-right
  const positionRef = useRef<number>(0);
  const isMobile = useIsMobile();

  // Set up scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction and adjust speed
      if (currentScrollY < lastScrollY.current) {
        // Scrolling down - gradually increase speed to positive (right to left)
        speedRef.current += (1 - speedRef.current) * 0.9;
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling up - gradually decrease speed to negative (left to right)
        speedRef.current += (-1 - speedRef.current) * 0.9;
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    // Prepare the marquee by duplicating items initially
    if (containerRef.current) {
      const container = containerRef.current;
      const items = Array.from(container.querySelectorAll('.marquee-item'));
      const totalWidth = items.reduce((acc, item) => acc + item.clientWidth, 0);

      // Clone enough items to fill the screen twice
      items.forEach(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        container.appendChild(clone);
      });

      // Set the width reference
      container.dataset.width = totalWidth.toString();
    }
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const totalWidth = parseFloat(container.dataset.width || "0");
        if (totalWidth === 0) return;

        // Calculate delta time and update position
        const deltaTime = time - previousTimeRef.current;
        positionRef.current += speedRef.current * deltaTime * 0.2;

        // Loop the position when reaching boundaries
        if (positionRef.current <= -totalWidth) {
          positionRef.current += totalWidth;
        } else if (positionRef.current >= 0) {
          positionRef.current -= totalWidth;
        }

        // Apply the transform
        container.style.transform = `translateX(${positionRef.current}px)`;
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return <section className="relative h-screen overflow-hidden">
      {/* Background Image - removed motion animation and effect */}
      <div style={{
      backgroundImage: `url('/lovable-uploads/0687a79e-6796-4aa0-9b7f-2f387647a9f2.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} className="absolute inset-0 w-full h-full z-0 bg-gray-700" />

      {/* Infinite Text Loop */}
      <div className="absolute bottom-[5px] left-0 w-full z-10 overflow-hidden">
        <div ref={containerRef} className="flex whitespace-nowrap will-change-transform">
          <div className="marquee-item text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[230px] font-medium text-white inline-block pr-[20px] xs:pr-[30px] sm:pr-[50px] md:pr-[80px] lg:pr-[100px] whitespace-nowrap opacity-90">
            AayushSoam- Freelance Designer & Developer.
          </div>
          <div className="marquee-item text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[230px] font-medium text-white inline-block pr-[20px] xs:pr-[30px] sm:pr-[50px] md:pr-[80px] lg:pr-[100px] whitespace-nowrap opacity-90">
            AayushSoam- Freelance Designer & Developer.
          </div>
          <div className="marquee-item text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[230px] font-medium text-white inline-block pr-[20px] xs:pr-[30px] sm:pr-[50px] md:pr-[80px] lg:pr-[100px] whitespace-nowrap opacity-90">
            AayushSoam- Freelance Designer & Developer.
          </div>
          <div className="marquee-item text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[230px] font-medium text-white inline-block pr-[20px] xs:pr-[30px] sm:pr-[50px] md:pr-[80px] lg:pr-[100px] whitespace-nowrap opacity-90">
            AayushSoam- Freelance Designer & Developer.
          </div>
        </div>
      </div>

      {/* Freelance Text and Icon */}
      <div data-scroll data-scroll-speed={0.1} className={`absolute ${isMobile ? 'top-[240px]' : 'top-[20%] sm:top-[25%] md:top-[30%] lg:top-[35%]'} left-[10%] sm:left-[25%] md:left-[50%] lg:left-[75%] text-white text-base sm:text-xl md:text-2xl font-light z-10`}>
        <svg className="transform scale-100 sm:scale-125 md:scale-150 lg:scale-[2] mb-[30px] sm:mb-[50px] md:mb-[75px] lg:mb-[100px]" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white" />
        </svg>
        <p className="m-0 mb-2.5">Freelance</p>
        <p className="m-0 mb-2.5">Designer & Developer</p>
      </div>
    </section>;
};
export default Hero;
