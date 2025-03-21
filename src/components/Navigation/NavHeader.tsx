
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoundedButton from './RoundedButton';
import Magnetic from '../Magnetic';
import Nav from './Nav';

export default function NavHeader() {
  const header = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const button = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(isActive) setIsActive(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (button.current) {
      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            if (button.current) {
              gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"});
            }
          },
          onEnterBack: () => {
            if (button.current) {
              gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"});
              setIsActive(false);
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div ref={header} className="absolute flex z-[1] top-0 text-white p-[35px] justify-between w-full font-light box-border items-center">
        <div className="flex cursor-pointer group">
          <p className="m-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[360deg]">©</p>
          <div className="flex relative overflow-hidden whitespace-nowrap ml-[5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:pr-[30px]">
            <p className="relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">Code by</p>
            <p className="relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pl-[0.3em] group-hover:-translate-x-[65px]">Aayush</p>
            <p className="absolute left-[120px] pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">Soam</p>
          </div>
        </div>
        <div className="flex items-center">
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <Link to="/work">Work</Link>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <Link to="/about">About</Link>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
              <Link to="/contact">Contact</Link>
              <div className="absolute w-[5px] h-[5px] top-[45px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"></div>
            </div>
          </Magnetic>
        </div>
      </div>
      <div ref={button} className="scale-0 fixed right-0 z-[4]">
        <RoundedButton onClick={() => {setIsActive(!isActive)}} className="relative m-[20px] w-[80px] h-[80px] bg-[#1C1D20]">
          <div className={`w-full relative z-[1] ${isActive ? 'burger-active' : 'burger'}`}></div>
        </RoundedButton>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
}
