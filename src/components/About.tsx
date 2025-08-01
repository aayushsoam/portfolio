import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import TextReveal from './TextReveal';
import AnimatedButton from './AnimatedButton';
import FadeInWhenVisible from './FadeInWhenVisible';
const About = () => {
  const descriptionRef = useRef(null);
  const isInView = useInView(descriptionRef, {
    once: true,
    amount: 0.2
  });
  const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const handleNavigation = (path: string) => {
    // When navigation is triggered, reload the page to show the loader
    window.location.href = path;
  };
  return <section ref={descriptionRef} className="py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:gap-20">
        <div className="mb-12 md:mb-0 md:w-2/3">
          <TextReveal text={phrase} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 sm:mb-12 lg:mb-16" />
          
          <motion.p initial={{
          opacity: 0
        }} animate={isInView ? {
          opacity: 1
        } : {
          opacity: 0
        }} transition={{
          duration: 0.5,
          delay: 0.6
        }} className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 md:mb-12 md:w-4/5">
            The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
          </motion.p>
        </div>
        
        <div className="md:w-1/3 relative">
          <FadeInWhenVisible delay={0.8}>
            <div className="relative">
              <div className="w-full max-w-[240px] h-[240px] sm:w-[240px] sm:h-[240px] md:w-[220px] md:h-[220px] lg:w-[240px] lg:h-[240px] rounded-3xl overflow-hidden mx-auto md:mx-0">
                <img alt="Designer" className="w-full h-full object-cover" src="/lovable-uploads/25faa88e-62a5-43b8-bc2c-4d2d33a2bf45.jpg" />
              </div>
              
              {/* Desktop: Button positioned as overlay */}
              <div className="absolute -bottom-8 -right-8 hidden md:block">
                <AnimatedButton backgroundColor="#000000" onClick={() => handleNavigation('/about')}>
                  <span className="text-zinc-950 font-semibold text-3xl mx-[33px] my-0 px-0 py-0">About me</span>
                </AnimatedButton>
              </div>
              
              {/* Mobile: Button centered below image */}
              <div className="mt-6 flex justify-center md:hidden">
                <AnimatedButton backgroundColor="#000000" onClick={() => handleNavigation('/about')}>
                  <span className="text-white">About me</span>
                </AnimatedButton>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>;
};
export default About;