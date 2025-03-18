
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import TextReveal from './TextReveal';
import AnimatedButton from './AnimatedButton';
import FadeInWhenVisible from './FadeInWhenVisible';

const About = () => {
  const descriptionRef = useRef(null);
  const isInView = useInView(descriptionRef, { once: true, amount: 0.2 });
  
  const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";

  return (
    <section ref={descriptionRef} className="py-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:gap-20">
        <div className="mb-12 md:mb-0 md:w-2/3">
          <TextReveal 
            text={phrase}
            className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed mb-16"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-gray-500 mb-12 md:w-4/5"
          >
            The combination of my passion for design, code & interaction positions me in a unique place in the web design world.
          </motion.p>
        </div>
        
        <div className="md:w-1/3 relative">
          <FadeInWhenVisible delay={0.8}>
            <div className="relative">
              <div className="w-60 h-60 rounded-3xl overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-8 -right-8">
                <AnimatedButton backgroundColor="#000000">
                  <span className="text-white">About me</span>
                </AnimatedButton>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default About;
