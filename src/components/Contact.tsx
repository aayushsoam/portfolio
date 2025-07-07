import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import AnimatedButton from './AnimatedButton';
import Magnetic from './Magnetic';
import FadeInWhenVisible from './FadeInWhenVisible';
const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return <motion.section ref={container} style={{
    y
  }} className="bg-black text-white py-32 z-0 ">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
        <div className="relative border-b border-gray-800 pb-24">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img alt="Profile" className="w-full h-full object-cover" src="https://i.postimg.cc/26GXc5Xy/background.png" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">Let's work</h2>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">together</h2>
            
            <motion.div style={{
            x
          }} className="absolute bottom-0 right-0 translate-y-1/2">
              <AnimatedButton backgroundColor="#444444" className="text-white">
                <span>Get in touch</span>
              </AnimatedButton>
            </motion.div>
            
            <motion.svg style={{
            rotate,
            scale: 2
          }} className="absolute top-12 right-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7L7 17M17 7H8M17 7V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
        </div>
        
        <div className="mt-24 flex flex-col md:flex-row gap-12">
          <FadeInWhenVisible delay={0.2} className="md:w-1/2">
            <AnimatedButton backgroundColor="#444444" className="text-white w-full">
              <span>hello@example.com</span>
            </AnimatedButton>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.4} className="md:w-1/2">
            <AnimatedButton backgroundColor="#444444" className="text-white w-full">
              <span>+1 (555) 123-4567</span>
            </AnimatedButton>
          </FadeInWhenVisible>
        </div>
        
        <div className="mt-40 flex flex-col md:flex-row justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-2">© 2023 All Rights Reserved</p>
          </div>
          
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm text-gray-400 mb-6">SOCIALS</h3>
            <div className="flex flex-col gap-4">
              <Magnetic>
                <a href="#" className="block text-gray-200 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="block text-gray-200 hover:text-white transition-colors">
                  Instagram
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="block text-gray-200 hover:text-white transition-colors">
                  Twitter
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="block text-gray-200 hover:text-white transition-colors">
                  Dribbble
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </motion.section>;
};
export default Contact;