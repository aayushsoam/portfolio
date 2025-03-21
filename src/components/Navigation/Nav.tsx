
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { menuSlide, slide } from './animation';
import Magnetic from '../Magnetic';

const navItems = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Work",
    href: "/work"
  },
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  }
]

const Nav = () => {
  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit"
      className="h-screen bg-black fixed right-0 top-0 text-white z-10"
    >
      <div className="h-full p-28 flex flex-col justify-between box-border">
        <div className="flex flex-col text-5xl gap-3 mt-20">
          {
            navItems.map((item, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div
                  custom={index}
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Magnetic>
                    <Link to={item.href} className="text-[4vw] font-light">
                      {item.title}
                    </Link>
                  </Magnetic>
                </motion.div>
              </div>
            ))
          }
        </div>
        <div className="flex w-full justify-between text-sm">
          <Magnetic>
            <a href="https://github.com">GitHub</a>
          </Magnetic>
          <Magnetic>
            <a href="https://linkedin.com">LinkedIn</a>
          </Magnetic>
          <Magnetic>
            <a href="https://twitter.com">Twitter</a>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  )
}

export default Nav;
